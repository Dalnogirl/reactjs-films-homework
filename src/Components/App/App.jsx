import React from 'react'
import {hot} from 'react-hot-loader'
import styles from './App.scss'
import MovieDetailsPage from '../MovieDetailsPage/MovieDetailsPage'
import {Provider} from 'react-redux'
import store from '../../redux/store'
import {HashRouter, useLocation} from 'react-router-dom'
import MoviesGrid from '../MoviesGrid/MoviesGrid'
import Navbar from '../Navbar/Navbar'
import {setPopularMovies, setTopRatedMovies} from '../../redux/moviesReducer'


const App = () => {
    const location = useLocation()
    let movieId = location.pathname.match(/(\d+)$/gmi) ? location.pathname.match(/(\d+)$/gmi)[0] : 123
    let gridFilter = location.pathname.match(/^\/(\w+)/gi)[0]
    let setMovieCallbacks = {
        '/popular': setPopularMovies,
        '/topRated': setTopRatedMovies
    }
    let setMovieCallback = setMovieCallbacks[gridFilter]

    return (
        <div className={styles.app}>
            <MovieDetailsPage movieId={movieId}/>
            <main className={styles.main}>
                <Navbar/>
                <MoviesGrid setMovies={setMovieCallback}/>
            </main>
        </div>
    )
}

const AppContainer = () => (
    <Provider store={store}>
        <HashRouter>
            <App>
            </App>
        </HashRouter>
    </Provider>

)


export default hot(module)(AppContainer)
