import { headerAPI } from '../dal/dal'
import { all, call, put, takeEvery } from '@redux-saga/core/effects'
import { appActions } from './appReducer'

const GET_MOVIE_INFO = 'headerReducer/GET_MOVIE_INFO'
const SET_IS_HEADER_FETCHING = 'headerReducer/SET_IS_HEADER_FETCHING'
const SET_TRAILER_KEY = 'headerReducer/SET_TRAILER_KEY'
const SAGA_GET_MOVIE_INFO = 'SAGA_GET_MOVIE_INFO'
const DISPATCH_TRAILER_KEY = 'DISPATCH_TRAILER_KEY'
const SET_TRAILER_KEY_ERROR = 'SET_TRAILER_KEY_ERROR'
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
    case DISPATCH_TRAILER_KEY: {
      return {
        ...state,
        trailerKey: action.data,
      }
    }
    case SET_TRAILER_KEY_ERROR: {
      return {
        ...state,
        errorMessage: action.data,
      }
    }
    default:
      return state
  }
}

export const headerActions = {
  getMovieInfo: (data) => ({ type: GET_MOVIE_INFO, data }),
  setIsHeaderFetching: (data) => ({ type: SET_IS_HEADER_FETCHING, data }),
  setTrailerKey: (data) => ({ type: SET_TRAILER_KEY, data }),
  dispatchTrailerKey: (data) => ({ type: DISPATCH_TRAILER_KEY, data }),
  sagaGetMovieInfo: (data) => ({ type: SAGA_GET_MOVIE_INFO, data }),
  setTrailerKeyError: (data) => ({ type: SET_TRAILER_KEY_ERROR, data }),
}

function* workGetMovieInfo(action) {
  yield put(headerActions.setIsHeaderFetching(true))
  const data = yield call(headerAPI.getMovieInfo, action.data)
  yield put(headerActions.getMovieInfo(data))
  yield put(headerActions.setIsHeaderFetching(false))
}

export function* watchSetTrailerKey() {
  yield takeEvery(SET_TRAILER_KEY, setTrailerKey)
}

export function* watchHeaderActions() {
  yield all([takeEvery(SAGA_GET_MOVIE_INFO, workGetMovieInfo), takeEvery(SET_TRAILER_KEY, setTrailerKey)])
}

function* setTrailerKey(action) {
  try {
    const data = yield call(headerAPI.getTrailerKey, action.data)
    const key = data.results[0].key
    yield put(headerActions.dispatchTrailerKey(key))
  } catch (e) {
    console.error(e)
    yield put(appActions.setError(`Something went wrong with ${action.data} trailer 😢`))
  }
}

export default headerReducer
