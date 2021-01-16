import React from 'react'
import {hot} from 'react-hot-loader'
import styles from './App.scss'
import MovieDetailsPage from '../MovieDetailsPage/MovieDetailsPage'

const App = () => (
    <div className={styles.app}>
        <MovieDetailsPage/>
    </div>
)

export default hot(module)(App)
