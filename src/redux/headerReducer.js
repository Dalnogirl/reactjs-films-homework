import { headerAPI } from '../dal/dal'

const GET_MOVIE_INFO = 'headerReducer/GET_MOVIE_INFO'
const SET_IS_HEADER_FETCHING = 'headerReducer/SET_IS_HEADER_FETCHING'
const SET_TRAILER_KEY = 'headerReducer/SET_TRAILER_KEY'
const initialState = {
  isHeaderFetching: false,
  trailerKey: null,
}

const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_INFO: {
      return {
        ...state,
        movieInfo: action.data,
      }
    }
    case SET_IS_HEADER_FETCHING: {
      return {
        ...state,
        isHeaderFetching: action.data,
      }
    }
    case SET_TRAILER_KEY: {
      return {
        ...state,
        trailerKey: action.datall,
      }
    }
    default:
      return state
  }
}

const headerActions = {
  getMovieInfo: (data) => ({ type: GET_MOVIE_INFO, data }),
  setIsHeaderFetching: (data) => ({ type: SET_IS_HEADER_FETCHING, data }),
  setTrailerKey: (data) => ({ type: SET_TRAILER_KEY, data }),
}

export const getMovieInfo = (movieId) => async (dispatch) => {
  dispatch(headerActions.setIsHeaderFetching(true))
  const data = await headerAPI.getMovieInfo(movieId)
  dispatch(headerActions.getMovieInfo(data))
  dispatch(headerActions.setIsHeaderFetching(false))
}

export const setTrailerKey = (movieId) => async (dispatch) => {
  let key
  try {
    key = await headerAPI.getTrailerKey(movieId)
    key = key.results[0].key
  } catch (e) {
    console.warn(e)
  }
  dispatch(headerActions.setTrailerKey(key))
}

export default headerReducer
