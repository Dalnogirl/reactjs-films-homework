import React from 'react'
import {hot} from 'react-hot-loader'
import styles from './App.scss'
import MovieDetailsPage from '../MovieDetailsPage/MovieDetailsPage'
import {Provider} from 'react-redux'
import store from '../../redux/store'
import {BrowserRouter, Redirect, Route} from 'react-router-dom'
import MoviesGrid from '../MoviesGrid/MoviesGrid'
import Navbar from '../Navbar/Navbar'
import Input from '../utils/Input/Input'


const App = () => {
    return (
        <div className={styles.app}>
            <Route exact path='/' render={() => <Redirect to={`/filter=topRated`}/>}/>
            <header className={styles.header}>
                <h1 className={styles.logo}>FILMS</h1>
                <div className={styles.searchContainer}>
                    <Input type="text" placeholder={'Search'}/>
                </div>
            </header>
            <Route path={[ '/search?q=:search&page=:page&id=:id',
                '/filter=:filterName&page=:page&id=:id']} render={() => <MovieDetailsPage/>}/>
            <main className={styles.main}>
                <Navbar/>
                <Route path={'/'} render={() => <MoviesGrid/>}/>
            </main>
        </div>
    )
}

const AppContainer = () => (
    <Provider store={store}>
        <BrowserRouter>
            <App>
            </App>
        </BrowserRouter>
    </Provider>

)


export default hot(module)(AppContainer)
