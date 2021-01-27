import React from 'react'
import {hot} from 'react-hot-loader'
import {Provider} from 'react-redux'
import {Redirect, BrowserRouter, Route} from 'react-router-dom'
import styles from './App.scss'
import MovieDetailsPage from '../MovieDetailsPage/MovieDetailsPage'
import store from '../../redux/store'
import MoviesGrid from '../MoviesGrid/MoviesGrid'
import Navbar from '../Navbar/Navbar'
import Input from '../utils/Input/Input'

const App = () => (
    <div className={styles.app}>
      <Route
          exact
          path="/"
          render={() => <Redirect to="/?filter=top_rated&page=1"/>}
      />

      <header className={styles.header}>
        <h1 className={styles.logo}>FILMS</h1>
        <div className={styles.searchContainer}>
          <Input type="text" placeholder="Search"/>
        </div>
      </header>
      <Route path="/" render={() => <MovieDetailsPage/>}/>
      <main className={styles.main}>
        <Navbar/>
        <Route path="/" render={() => <MoviesGrid/>}/>
      </main>
    </div>
)

const AppContainer = () => (
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>

)

export default hot(module)(AppContainer)
