import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import styles from './MovieDetailsPage.module.scss'
import Rating from '../Rating/Rating'
import Popover from '../Popover/Popover'
import MovieTags from '../MovieTags/MovieTags'
import { headerActions } from '../../redux/headerReducer'
import { getIsHeaderFetching, getMovieInfoSelector } from '../../redux/selectors/selectors'
import Loader from '../Loader/Loader'
import Button from '../Button/Button'
import Modal from '../Modal/Modal'

const MovieDetailsPage = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const isHeaderFetching = useSelector(getIsHeaderFetching)
  const { id } = useParams()
  const [isTrailerVisible, setIsTrailerVisible] = useState(false)

  useEffect(() => {
    dispatch(headerActions.sagaGetMovieInfo(id))
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [location])

  const movieInfo = useSelector(getMovieInfoSelector)

  return id && !isHeaderFetching && movieInfo ? (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movieInfo.backdrop_path})` }}
    >
      <main className={styles.main}>
        <div className={styles.mainInfoWrapper}>
          <p className={styles.movieName}>{movieInfo.title}</p>
          <div className={styles.movieTagContainer}>
            <MovieTags genresNames={movieInfo.genres} />
          </div>
          <Rating starsCount={movieInfo.vote_average / 2} />
        </div>
        <div className={styles.controls}>
          <Button
            data-testid="watchTrailerButton"
            onClick={() => {
              setIsTrailerVisible(true)
            }}
          >
            Watch Trailer
          </Button>
          {isTrailerVisible && <Modal movieId={+id} data-testid="modal" callback={setIsTrailerVisible} />}
          <Popover width={70} text="Info">
            {movieInfo.overview}
          </Popover>
        </div>
      </main>
    </div>
  ) : (
    <div className={styles.container}>
      <Loader />
    </div>
  )
}

export default MovieDetailsPage
