// workbox.loadModule('workbox-range-requests')
workbox.setConfig({ debug: false })
// console.log(workbox)

const regSourcesMatch = /\.(js|css|png|jpg|lrc|json)$/
workbox.routing.registerRoute(
  function ({ url }) {
    return regSourcesMatch.test(url)
  },
  new workbox.strategies.CacheFirst({
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200]
      })
    ]
  })
)

const regMp3Match = /\.mp3$/
workbox.routing.registerRoute(
  function ({ url }) {
    return regMp3Match.test(url)
  },
  function ({ url, event }) {
    return new Promise(function (resolve, reject) {
      const request = event.request
      const rangeHeader = event.request.headers.get('range')

      if (!regMp3Match.test(url) || !rangeHeader) {
        return fetch(request, { mode: 'cors' })
          .then(resolve, reject)
      }

      caches.open('mp3-v1')
        .then(function (cache) {
          return cache.match(url)
            .then(function (res) {
              if (res) {
                console.log('match cache mp3')

                return res.arrayBuffer()
              } else {
                console.log(rangeHeader)

                let req = new Request(request.clone(), {
                  headers: { range: 'bytes=0-' }
                })
                return fetch(req.clone(), { mode: 'cors' })
                  .then(function (res) {
                    if (res.status.toString().startsWith('2')) {
                      console.log('fetch sussese and cache ', url)

                      cache.put(req, res.clone())

                      return res.arrayBuffer()
                    }
                  })
                  .catch(reject)
              }
            })
            .then(function (arrayBuffer) {
              const bytes = /^bytes\=(\d+)\-(\d+)?$/g.exec(rangeHeader) // eslint-disable-line
              if (bytes) {
                const start = Number(bytes[1])
                const end = Number(bytes[2]) || arrayBuffer.byteLength - 1
                resolve(new Response(arrayBuffer.slice(start, end + 1), {
                  status: 206,
                  statusText: 'Partial Content',
                  headers: [
                    // ['access-control-allow-origin', '*'],
                    // ['accept-ranges', 'bytes'],
                    ['Content-Range', `bytes ${start}-${end}/${arrayBuffer.byteLength}`],
                    ['Content-Length', arrayBuffer.byteLength.toString()],
                    ['content-type', 'audio/mpeg']
                    // ['status', 200]
                  ]
                }))
              } else {
                resolve(new Response(null, {
                  status: 416,
                  statusText: 'Range Not Satisfiable',
                  headers: [
                    ['Content-Range', `*/${arrayBuffer.byteLength}`]
                  ]
                }))
              }
            })
        })
    })
  }
)

workbox.routing.registerRoute(
  function ({ url }) {
    return !regSourcesMatch.test(url) && !regMp3Match.test(url)
  },
  new workbox.strategies.NetworkFirst({
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200]
      })
    ]
  })
)

workbox.core.skipWaiting()
workbox.core.clientsClaim()
