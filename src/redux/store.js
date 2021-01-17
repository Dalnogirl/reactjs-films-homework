import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleWare from "redux-thunk";
import headerReducer from './headerReducer'
import moviesReducer from './moviesReducer'

let rootReducer = combineReducers({
    headerData: headerReducer,
    moviesData: moviesReducer
})

let store = createStore(rootReducer, applyMiddleware(thunkMiddleWare))

export default store