import qs from 'qs'

export const urlHelpers = {
  getSearchQuery(location) {
    return qs.parse(location.search, {ignoreQueryPrefix: true}).q
  },
}
