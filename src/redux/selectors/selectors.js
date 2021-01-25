import {createSelector} from 'reselect'

export let getMovieInfoSelector = (state) => state.headerData.movieInfo

export let getMoviesSelector = state => state.moviesData.moviesList

export let getGenresSelector = state => state.moviesData.genresObj

export let getIsFetching = state => state.moviesData.isFetching

export let getIsHeaderFetching = state => state.headerData.isFetching

export let getCurrentPage = state => state.moviesData.currentPage

export let getGenresNames = createSelector(getGenresSelector,
    genresArray => {
        return genresArray.map(i => i.name)
    }
)