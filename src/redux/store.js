import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleWare from "redux-thunk";
import headerReducer from './headerReducer'
import moviesReducer from './moviesReducer'
import {composeWithDevTools} from 'redux-devtools-extension'

let rootReducer = combineReducers({
    headerData: headerReducer,
    moviesData: moviesReducer
})

let store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunkMiddleWare)))
window.store =store

export default store