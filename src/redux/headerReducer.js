import {headerAPI} from '../dal/dal'

const GET_MOVIE_INFO = 'GET_MOVIE_INFO'
const SET_IS_FETCHING = 'SET_IS_FETCHING'
const SET_TRAILER_KEY = 'SET_TRAILER_KEY'
const initialState = {
  //movieInfo: null
  isFetching: false,
  trailerKey: null
}

function headerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIE_INFO: {
      return {
        ...state,
        movieInfo: {...action.data}
      }
    }
    case SET_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.data
      }
    }
    case SET_TRAILER_KEY: {
      return {
        ...state,
        trailerKey: action.data
      }
    }
    default:
      return state
  }
}

let headerActions = {
  getMovieInfo: (data) => ({type: GET_MOVIE_INFO, data}),
  setIsFetching: data => ({type: SET_IS_FETCHING, data}),
  setTrailerKey: data => ({type: SET_TRAILER_KEY, data})

}

export let getMovieInfo = (movieId) => {
  return async (dispatch) => {
    dispatch(headerActions.setIsFetching(true))

    let data = await headerAPI.getMovieInfo(movieId)
    dispatch(headerActions.getMovieInfo(data))
    let key
    try {
      key = await headerAPI.getTrailerKey(movieId)
      key = key.results[0].key

      debugger
    } catch (e) {
      console.log(e)
    }
    dispatch(headerActions.setTrailerKey(key))

    dispatch(headerActions.setIsFetching(false))
  }
}


export default headerReducer