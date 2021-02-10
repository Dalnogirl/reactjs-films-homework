import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Pagination from '@material-ui/lab/Pagination'
import qs from 'qs'
import styles from './MoviesGrid.module.scss'
import MovieCard from '../MovieCard/MovieCard'
import { moviesActions, setGenresObj, setMovies } from '../../redux/moviesReducer'

import {
  getCurrentFilter,
  getCurrentGenre,
  getCurrentPage,
  getGenresSelector,
  getIsFetching,
  getMoviesSelector,
  getTotalResults,
} from '../../redux/selectors/selectors'
import Loader from '../Loader/Loader'

const MoviesGrid = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const allGenres = useSelector(getGenresSelector)
  const isFetching = useSelector(getIsFetching)
  const searchQuery = qs.parse(location.search, { ignoreQueryPrefix: true }).q
  const page = useSelector(getCurrentPage)
  const filter = useSelector(getCurrentFilter)
  const currentGenre = useSelector(getCurrentGenre)
  const totalResults = useSelector(getTotalResults)
  useEffect(() => {
    if (searchQuery) {
      dispatch(setMovies({ searchQuery, page }))
    } else if (currentGenre) {
      dispatch(setMovies({ filter, genre: currentGenre, page }))
    } else {
      dispatch(setMovies({ filter, page }))
    }

    dispatch(setGenresObj())
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    })
  }, [searchQuery, page, currentGenre])

  const list = useSelector(getMoviesSelector)
  return !list ? (
    <div className={styles.container}>
      <Loader />
    </div>
  ) : (
    <div className={styles.container}>
      <div className={isFetching ? styles.moviesGridFetching : styles.moviesGrid}>
        {list &&
          list?.results.map((item) => (
            <MovieCard
              key={item.id}
              id={item.id}
              movieName={item.title}
              genresIds={item.genre_ids}
              poster={item.poster_path}
              rating={item.vote_average / 2}
              overview={item.overview}
              allGenres={allGenres}
            />
          ))}
      </div>
      <Pagination
        className={styles.paginator}
        size="large"
        count={Math.ceil(totalResults / 20)}
        shape="rounded"
        page={page}
        onChange={(e, _page) => {
          dispatch(moviesActions.setCurrentPage(_page))
        }}
      />
    </div>
  )
}

export default React.memo(MoviesGrid)
