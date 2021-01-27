import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import styles from './MoviesGrid.module.scss'
import MovieCard from '../MovieCard/MovieCard'
import {setGenresObj, setMovies} from '../../redux/moviesReducer'
import {
  getGenresSelector,
  getIsFetching,
  getMoviesSelector,
} from '../../redux/selectors/selectors'
import Loader from '../utils/Loader/Loader'
import {urlHelpers} from '../utils/functions/functions'
import Trigger from './Trigger/Trigger'

const MoviesGrid = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const filter = urlHelpers.getFilter(location)
  const page = urlHelpers.getPage(location)
  const allGenres = useSelector(getGenresSelector)
  const isFetching = useSelector(getIsFetching)
  const genre = urlHelpers.getGenre(location)
  const searchQuery = urlHelpers.getSearchQuery(location)

  useEffect(() => {
    dispatch(setMovies(location))
    dispatch(setGenresObj())

    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    })
  }, [filter, page, genre, searchQuery])

  const list = useSelector(getMoviesSelector)

  return isFetching ? (
      <Loader/>
  ) : (
      <div className={styles.container}>
        <div className={styles.moviesGrid}>
          {list && list?.results.map((item) => (
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
        <Trigger location={location}/>
      </div>
  )
}

export default React.memo(MoviesGrid)
