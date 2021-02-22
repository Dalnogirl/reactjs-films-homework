import thunkMiddleWare from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import { rootReducer } from '../src/redux/store'

const createMockStore = (
  state = {
    moviesData: {
      isFetching: false,
      moviesList: null,
      genresObj: {},
      currentFilter: 'top_rated',
      currentGenre: null,
      currentPage: 1,
      totalResults: null,
    },
    headerData: {
      isHeaderFetching: false,
      trailerKey: null,
    },
  },
) => createStore(rootReducer, state, applyMiddleware(thunkMiddleWare))

export default createMockStore
