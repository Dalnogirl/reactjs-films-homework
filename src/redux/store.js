import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleWare from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import headerReducer from './headerReducer'
import moviesReducer from './moviesReducer'
import appReducer from './appReducer'
import { rootSaga } from './sagas'

export const rootReducer = combineReducers({
  headerData: headerReducer,
  moviesData: moviesReducer,
  appData: appReducer,
})
const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleWare, sagaMiddleware)))
sagaMiddleware.run(rootSaga)
export default store
