// workbox.loadModule('workbox-range-requests')

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
// workbox.routing.registerRoute(
//   function ({ url }) {
//     return regMp3Match.test(url)
//   },
//   new workbox.strategies.CacheFirst({
//     plugins: [
//       new workbox.cacheableResponse.Plugin({
//         statuses: [200, 206]
//       }),
//       new workbox.rangeRequests.Plugin()
//     ]
//   })
// )

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
