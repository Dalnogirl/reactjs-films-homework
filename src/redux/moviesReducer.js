import { moviesApi } from '../dal/dal'
import { all, call, put, takeEvery } from '@redux-saga/core/effects'
import { appActions } from './appReducer'

export const SET_MOVIES = 'moviesReducer/SET_MOVIES'
const DISPATCH_MOVIES = 'moviesReducer/DISPATCH_MOVIES'
const SET_GENRES_OBJ = 'moviesReducer/SET_GENRES_OBJ'
export const SET_IS_FETCHING = 'moviesReducer/SET_IS_FETCHING'
const SET_CURRENT_PAGE = 'moviesReducer/SET_CURRENT_PAGE'
export const SET_CURRENT_GENRE = 'moviesReducer/SET_CURRENT_GENRE'
const SET_CURRENT_FILTER = 'moviesReducer/SET_CURRENT_FILTER'
const SET_TOTAL_RESULTS = 'moviesReducer/SET_TOTAL_RESULTS'
const DISPATCH_GENRES_OBJ = 'moviesReducer/DISPATCH_GENRES_OBJ'

const initialState = {
  isFetching: false,
  moviesList: null,
  genresObj: {},
  currentFilter: 'top_rated',
  currentGenre: null,
  currentPage: 1,
  totalResults: null,
}

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPATCH_MOVIES: {
      return {
        ...state,
        moviesList: { ...action.data },
      }
    }
    case DISPATCH_GENRES_OBJ: {
      return {
        ...state,
        genresObj: { ...action.data },
      }
    }
    case SET_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.data,
      }
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.data,
      }
    }
    case SET_CURRENT_FILTER: {
      return {
        ...state,
        currentFilter: action.data,
      }
    }
    case SET_CURRENT_GENRE: {
      return {
        ...state,
        currentGenre: action.data,
      }
    }
    case SET_TOTAL_RESULTS: {
      return {
        ...state,
        totalResults: action.data,
      }
    }

    default:
      return state
  }
}

const urlCreatorForAJAX = ({ genre, filter, page = 1, searchQuery }) => {
  if (searchQuery) {
    return `/search/movie?api_key=0d62501dce3049a65b9d183d8e927cfa&query=${searchQuery}&page=${page}`
  }
  if (genre) {
    return `/movie/${filter}?api_key=0d62501dce3049a65b9d183d8e927cfa&page=${page}&with_genres=${genre}`
  }
  return `/movie/${filter}?api_key=0d62501dce3049a65b9d183d8e927cfa&page=${page}`
}

export const moviesActions = {
  setGenresObj: (data) => ({ type: SET_GENRES_OBJ, data }),
  setMovies: (data) => ({ type: SET_MOVIES, data }),
  dispatchMovies: (data) => ({ type: DISPATCH_MOVIES, data }),
  setIsFetching: (data) => ({ type: SET_IS_FETCHING, data }),
  setCurrentFilter: (data) => ({ type: SET_CURRENT_FILTER, data }),
  setCurrentPage: (data) => ({ type: SET_CURRENT_PAGE, data }),
  setCurrentGenre: (data) => ({ type: SET_CURRENT_GENRE, data }),
  setTotalResults: (data) => ({ type: SET_TOTAL_RESULTS, data }),
  dispatchGenresObj: (data) => ({ type: DISPATCH_GENRES_OBJ, data }),
}

function* setGenresObjWorker() {
  try {
    const data = yield call(moviesApi.getGenresObj)
    yield put(moviesActions.dispatchGenresObj(data))
  } catch (e) {
    console.error(e)
    yield put(appActions.setError('Something went wrong with genres... Please try again later'))
  }
}

export function* watcherMoviesActions() {
  yield all([takeEvery(SET_MOVIES, setMoviesWorker), takeEvery(SET_GENRES_OBJ, setGenresObjWorker)])
}

function* setMoviesWorker(action) {
  try {
    yield put(moviesActions.setIsFetching(true))
    const url = urlCreatorForAJAX(action.data)
    const data = yield call(moviesApi.getMovies, url)
    yield put(moviesActions.dispatchMovies(data))
    yield put(moviesActions.setTotalResults(data.total_results))
    yield put(moviesActions.setIsFetching(false))
  } catch (e) {
    console.error(e)
    yield put(appActions.setError('Something went wrong... Please try again later'))
  }
}

export default moviesReducer
