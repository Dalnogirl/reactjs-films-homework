import qs from 'qs'

export let urlHelpers = {
    getId(location) {
        if (location.search.length > 0) {
            return qs.parse(location.search).id
        }
        return qs.parse(location.pathname).id
    },
    getPage(location) {
        if (location.search.length > 0) {
            return qs.parse(location.search).page
        }
        return +qs.parse(location.pathname).page
    },
    getFilter(location) {
        return qs.parse(location.pathname.slice(1)).filter // slicing the '/' symbol
    },
    getSearchQuery(location) {
        return qs.parse(location.search,{ignoreQueryPrefix: true}).q
    },
    getGenre(location) {
        return qs.parse(location.pathname).with_genres
    }
}

export const urlCreatorForPagination = (location) => {
    let filter = urlHelpers.getFilter(location)
    let searchQuery = urlHelpers.getSearchQuery(location)
    let page = urlHelpers.getPage(location)
    let genre = urlHelpers.getGenre(location)
    if (location.search.length > 0) {
        return `/search?q=${searchQuery}&page=${+page + 1}`
    } else {
        if (genre) return `/filter=${filter}&with_genres=${genre}&page=${+page + 1}`
        else return  `/filter=${filter}&page=${+page+1}`
    }
}

export  const urlCreatorForCard = (location, id) => {
    let filter = urlHelpers.getFilter(location)
    let searchQuery = urlHelpers.getSearchQuery(location)
    let page = urlHelpers.getPage(location)
    let genre = urlHelpers.getGenre(location)
    if (location.search.length > 0) {
        return  `/search?q=${searchQuery}&page=${page}&id=${id}`
    } else {
        if (genre) return `/filter=${filter}&page=${page}&with_genres=${genre}&id=${id}`
        else return  `/filter=${filter}&page=${page}&id=${id}`
    }
}

export const urlCreatorForDropdown = (location, genreId) => {
    let filter = urlHelpers.getFilter(location) || 'top_rated'
    return `/filter=${filter}&page=1&with_genres=${genreId}`
}

function debounce(func, ms) {
    let isCooldown = false
    return (...args) => {
        if (isCooldown) return 'debounced'
        else {
            isCooldown = true
            setTimeout(() => isCooldown = false, ms)
            return func.apply(this, args)

        }
    }
}

export const debouncedUrlCreatorForPagination = debounce(urlCreatorForPagination, 300)