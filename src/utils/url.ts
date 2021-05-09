export function getUrlQuery (key?: string) {
  const { search } = location
  const result: Record<string, string> = {}
  search.slice(1).split('&').forEach((queryKeyValuePair) => {
    const [key, value] = queryKeyValuePair.split('=')
    result[key] = value || ''
  })

  return key ? result[key] : result
}
