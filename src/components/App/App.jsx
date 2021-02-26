import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import styles from './App.scss'
import MovieDetailsPage from '../MovieDetailsPage/MovieDetailsPage'
import MoviesGrid from '../MoviesGrid/MoviesGrid'
import Navbar from '../Navbar/Navbar'
import Input from '../Input/Input'
import { useSelector } from 'react-redux'
import { getErrorMessage } from '../../redux/selectors/selectors'
import AlertDialogSlide from '../ErrorAlert/ErrorAlert'

const MainSection = () => (
  <main className={styles.main}>
    <Navbar />
    <MoviesGrid />
  </main>
)

const App = () => {
  const errorMessage = useSelector(getErrorMessage)
  return (
    <div className={styles.app}>
      {errorMessage && <AlertDialogSlide />}
      <header className={styles.header}>
        <h1 className={styles.logo}>FILMS</h1>
        <div className={styles.searchContainer}>
          <Input type="text" placeholder="Search" />
        </div>
      </header>
      <Switch>
        <Route exact path="/" component={MainSection} />
        <Route path={['/movie/:id', '/movie/:id/search?q=:q']} component={MovieDetailsPage} />
        <Route path="/search" component={MainSection} />
        <Route path="/404" component={() => 'Not Found'} />
        <Redirect to="/404" />
      </Switch>
      <Route path="/movie" component={MainSection} />
    </div>
  )
}

export default App
