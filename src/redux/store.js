import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleWare from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import headerReducer from './headerReducer'
import moviesReducer from './moviesReducer'

const rootReducer = combineReducers({
  headerData: headerReducer,
  moviesData: moviesReducer,
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleWare)))
export default store
