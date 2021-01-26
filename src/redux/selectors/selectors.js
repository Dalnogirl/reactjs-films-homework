import {createSelector} from 'reselect'

export const getMovieInfoSelector = (state) => state.headerData.movieInfo

export const getMoviesSelector = (state) => state.moviesData.moviesList

export const getGenresSelector = (state) => state.moviesData.genresObj

export const getIsFetching = (state) => state.moviesData.isFetching

export const getIsHeaderFetching = (state) => state.headerData.isHeaderFetching

export const getTrailerKey = (state) => state.headerData.trailerKey

export const getCurrentPage = (state) => state.moviesData.currentPage

export const getGenresNames = createSelector(getGenresSelector,
  (genresArray) => genresArray.map((i) => i.name))
