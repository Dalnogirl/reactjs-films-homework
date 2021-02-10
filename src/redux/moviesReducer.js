import { moviesApi } from '../dal/dal'

const SET_MOVIES = 'moviesReducer/SET_MOVIES'
const SET_GENRES_OBJ = 'moviesReducer/SET_GENRES_OBJ'
const SET_IS_FETCHING = 'moviesReducer/SET_IS_FETCHING'
const INCREMENT_CURRENT_PAGE = 'moviesReducer/INCREMENT_CURRENT_PAGE'
const SET_CURRENT_PAGE = 'moviesReducer/SET_CURRENT_PAGE'
const SET_CURRENT_GENRE = 'moviesReducer/SET_CURRENT_GENRE'
const SET_CURRENT_FILTER = 'moviesReducer/SET_CURRENT_FILTER'
const SET_TOTAL_RESULTS = 'moviesReducer/SET_TOTAL_RESULTS'

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
    case SET_MOVIES: {
      return {
        ...state,
        moviesList: { ...action.data },
      }
    }
    case SET_GENRES_OBJ: {
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
    case INCREMENT_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: state.currentPage + 1,
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
  setIsFetching: (data) => ({ type: SET_IS_FETCHING, data }),
  setCurrentFilter: (data) => ({ type: SET_CURRENT_FILTER, data }),
  setCurrentPage: (data) => ({ type: SET_CURRENT_PAGE, data }),
  setCurrentGenre: (data) => ({ type: SET_CURRENT_GENRE, data }),
  setTotalResults: (data) => ({ type: SET_TOTAL_RESULTS, data }),
  incrementCurrentPage: () => ({ type: INCREMENT_CURRENT_PAGE }),
}

export const setGenresObj = () => (dispatch) => {
  moviesApi.getGenresObj().then((data) => dispatch(moviesActions.setGenresObj(data)))
}

export const setMovies = (props) => async (dispatch) => {
  dispatch(moviesActions.setIsFetching(true))
  const data = await moviesApi.getMovies(urlCreatorForAJAX(props))
  props.filter && moviesActions.setCurrentFilter(props.filter)
  dispatch(moviesActions.setMovies(data))
  dispatch(moviesActions.setTotalResults(data.total_results))
  dispatch(moviesActions.setIsFetching(false))
}

export default moviesReducer
