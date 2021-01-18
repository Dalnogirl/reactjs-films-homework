import React from 'react'
import {hot} from 'react-hot-loader'
import styles from './App.scss'
import MovieDetailsPage from '../MovieDetailsPage/MovieDetailsPage'
import MoviesGrid from '../MoviesGrid/MoviesGrid'
import {Provider} from 'react-redux'
import store from '../../redux/store'


const App = () => (
    <Provider store={store}>
        <div className={styles.app}>
            <MovieDetailsPage/>
            <MoviesGrid/>
        </div>
    </Provider>

)


export default hot(module)(App)
