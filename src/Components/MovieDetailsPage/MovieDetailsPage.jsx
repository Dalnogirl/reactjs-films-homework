import React, {useEffect, useState} from 'react'
import styles from './MovieDetailsPage.module.scss'
import Rating from '../utils/Rating/Rating'
import Popover from '../utils/Popover/Popover'
import MovieTags from '../utils/MovieTags/MovieTags'
import {useDispatch, useSelector} from 'react-redux'
import {getMovieInfo, setTrailerKey} from '../../redux/headerReducer'
import {
  getIsHeaderFetching,
  getMovieInfoSelector,
  getTrailerKey,
} from '../../redux/selectors/selectors'
import {Link, useLocation} from 'react-router-dom'
import Loader from '../utils/Loader/Loader'
import {urlCreatorForCard, urlHelpers} from '../utils/functions/functions'
import Button from '../utils/Button/Button'

const MovieDetailsPage = () => {
  let dispatch = useDispatch()
  let location = useLocation()
  let isHeaderFetching = useSelector(getIsHeaderFetching)
  let id = urlHelpers.getId(location)
  let link = urlCreatorForCard(location, id) // no id in current url, so we should pass id as argument

  useEffect(() => {
    let movieId = urlHelpers.getId(location)
    if (movieId) {
      dispatch(getMovieInfo(movieId))
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }, [location])

  let movieInfo = useSelector(getMovieInfoSelector)

  return !isHeaderFetching && movieInfo ? <div className={styles.container}
                                               style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movieInfo.backdrop_path})`}}>
    <main className={styles.main}>
      <div className={styles.mainInfoWrapper}>
        <p className={styles.movieName}>
          {movieInfo.title}
        </p>
        <div className={styles.movieTagContainer}>
          <MovieTags genresNames={movieInfo.genres}/>
        </div>
        <Rating starsCount={movieInfo.vote_average / 2}/>
      </div>
      <div className={styles.controls}>
        <Link to={`${link}/trailer`}>
          <Button>Watch trailer</Button>
        </Link>
        <Popover width={70} text={`Info`}>
          {movieInfo.overview}
        </Popover>
      </div>

    </main>
  </div> : <div className={styles.container}><Loader/></div>
}



export default MovieDetailsPage