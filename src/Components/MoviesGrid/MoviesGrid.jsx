import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory, useLocation} from 'react-router-dom'
import styles from './MoviesGrid.module.scss'
import MovieCard from '../MovieCard/MovieCard'
import {setGenresObj, setMovies} from '../../redux/moviesReducer'
import {
  getGenresSelector,
  getIsFetching,
  getMoviesSelector,
} from '../../redux/selectors/selectors'
import Loader from '../utils/Loader/Loader'
import {
  debouncedUrlCreatorForPagination,
  urlHelpers,
} from '../utils/functions/functions'

function useIntersection(options) {
  const [observerEntry, setEntry] = useState({})
  const elRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => setEntry(entries[0]),
        options)
    observer.observe(elRef.current)
    return () => observer.disconnect()
  }, [elRef])

  return {observerEntry, elRef}
}

function Trigger() {
  const history = useHistory()
  const {observerEntry, elRef} = useIntersection({
    root: null,
    threshold: 1,
    rootMargin: '30px',
  })
  useEffect(() => {
    if (observerEntry.isIntersecting) {
      let url = debouncedUrlCreatorForPagination(location)
      if (url !== 'debounced') {
        history.push(url)
      }
    }

  }, [observerEntry.isIntersecting])

  return (
      <div ref={elRef}>
        <h2>Scroll To Load More</h2>
      </div>
  )
}

const MoviesGrid = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const filter = urlHelpers.getFilter(location)
  const page = urlHelpers.getPage(location)
  const allGenres = useSelector(getGenresSelector)
  const isFetching = useSelector(getIsFetching)
  const genre = urlHelpers.getGenre(location)

  useEffect(() => {
    dispatch(setMovies(location))
    dispatch(setGenresObj())

    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    })
  }, [filter, page, genre])

  const list = useSelector(getMoviesSelector)

  return isFetching ? (
      <Loader/>
  ) : (
      <div className={styles.container}>
        <div className={styles.moviesGrid}>
          {list && list.results.map((item) => (
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
        <Trigger/>
      </div>
  )
}

export default React.memo(MoviesGrid)
