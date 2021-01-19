import {createSelector} from 'reselect'

export let getMovieInfoSelector = (state) => state.headerData.movieInfo

export let getMoviesSelector = state => state.moviesData.moviesList

export let getGenresSelector = state => state.moviesData.genresArray

export let getGenresNames = createSelector(getGenresSelector,
    genresArray => {

        return genresArray.map(i => i.name)
    }
)