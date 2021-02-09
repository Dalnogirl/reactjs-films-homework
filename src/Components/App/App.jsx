import React from 'react'
import {hot} from 'react-hot-loader'
import {Provider} from 'react-redux'
import {
BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom'
import styles from './App.scss'
import MovieDetailsPage from '../MovieDetailsPage/MovieDetailsPage'
import store from '../../redux/store'
import MoviesGrid from '../MoviesGrid/MoviesGrid'
import Navbar from '../Navbar/Navbar'
import Input from '../utils/Input/Input'

const MainSection = () => (
    <main className={styles.main}>
      <Navbar/>
      <MoviesGrid/>
    </main>
)

const App = () => (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.logo}>FILMS</h1>
        <div className={styles.searchContainer}>
          <Input type="text" placeholder="Search"/>
        </div>
      </header>
      <Switch>
        <Route exact path="/" component={MainSection}/>
        <Route
path={['/movie/:id', '/movie/:id/search?q=:q']}
               component={MovieDetailsPage}
        />
        <Route path="/search" component={MainSection}/>
        <Route path="/404" component={() => 'Not Found'}/>
        <Redirect to="/404"/>
      </Switch>
      <Route path="/movie" component={MainSection}/>
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
