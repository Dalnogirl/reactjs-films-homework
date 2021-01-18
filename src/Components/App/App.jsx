import React from 'react'
import {hot} from 'react-hot-loader'
import styles from './App.scss'
import MovieDetailsPage from '../MovieDetailsPage/MovieDetailsPage'
import {Provider} from 'react-redux'
import store from '../../redux/store'
import {HashRouter, Route} from 'react-router-dom'
import MoviesGrid from '../MoviesGrid/MoviesGrid'
import Navbar from '../Navbar/Navbar'
import {setPopularMovies, setTopRatedMovies} from '../../redux/moviesReducer'


const App = () => {


    return (
        <Provider store={store}>
            <HashRouter>
                <div className={styles.app}>
                    <Route path={[
                        '/popular/:movieId?',
                        '/topRated/:movieId?'
                    ]} render={() => <MovieDetailsPage/>}/>
                    <main className={styles.main}>
                        <Navbar/>
                        <Route path='/popular' render={() => <MoviesGrid setMovies={setPopularMovies}/>}/>
                        <Route path='/topRated' render={() => <MoviesGrid setMovies={setTopRatedMovies}/>}/>
                    </main>
                </div>
            </HashRouter>
        </Provider>

    )
}


export default hot(module)(App)
