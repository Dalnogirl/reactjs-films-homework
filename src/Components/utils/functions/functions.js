import qs from 'qs'

export const urlHelpers = {
  getId(location) {
    if (!qs.parse(location.search).id) return null
    return qs.parse(location.search).id
  },
  getPage(location) {
    return +qs.parse(location.search).page
  },
  getFilter(location) {
    return qs.parse(location.search, {ignoreQueryPrefix: true}).filter
  },
  getSearchQuery(location) {
    return qs.parse(location.search, {ignoreQueryPrefix: true}).q
  },
  getGenre(location) {
    return qs.parse(location.search).with_genres
  },
}

export const urlCreatorForPagination = (location) => {
  const searchQuery = urlHelpers.getSearchQuery(location)
  const page = urlHelpers.getPage(location)
  const genre = urlHelpers.getGenre(location)
  if (location.pathname === '/search') {
    return `/search?q=${searchQuery}&page=${+page + 1}`
  }
  const filter = urlHelpers.getFilter(location)
  if (genre) return `/?filter=${filter}&with_genres=${genre}&page=${+page + 1}`
  return `/?filter=${filter}&page=${+page + 1}`
}

export const urlCreatorForCard = (location, id) => {
  const filter = urlHelpers.getFilter(location)
  const searchQuery = urlHelpers.getSearchQuery(location)
  const page = urlHelpers.getPage(location)
  const genre = urlHelpers.getGenre(location)
  if (location.pathname === '/search') {
    return `/search?q=${searchQuery}&page=${page}&id=${id}`
  }
  if (genre) return `/?filter=${filter}&page=${page}&with_genres=${genre}&id=${id}`
  return `/?filter=${filter}&page=${page}&id=${id}`
}

export const urlCreatorForDropdown = (location, genreId) => {
  const filter = urlHelpers.getFilter(location) || 'top_rated'
  return `/?filter=${filter}&page=1&with_genres=${genreId}`
}

function debounce(func, ms) {
  let isCooldown = false
  return (...args) => {
    if (isCooldown) return 'debounced'
    isCooldown = true
    setTimeout(() => { isCooldown = false }, ms)
    return func.apply(this, args)
  }
}

export const debouncedUrlCreatorForPagination = debounce(
    urlCreatorForPagination, 300)
