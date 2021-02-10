import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './MovieCard.module.scss'
import play from '../../assets/play (1).svg'
import Button from '../utils/Button/Button'
import MovieTags from '../utils/MovieTags/MovieTags'
import Rating from '../utils/Rating/Rating'
import {urlHelpers} from '../utils/functions/functions'
import Modal from '../utils/Modal/Modal'

const MovieCard = (({
  movieName, rating, genresIds, poster, overview, id, allGenres,
}) => {
  const [movieTitle, setMovieTitle] = useState(movieName)
  const location = useLocation()
  const searchQuery = urlHelpers.getSearchQuery(location)

  useEffect(() => {
    if (movieName.length > 14) setMovieTitle(`${movieName.slice(0, 14)}...`)
  }, [])

  const [infoMode, setInfoMode] = useState(false)
  const [isTrailerVisible, setIsTrailerVisible] = useState(false)

  return (
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div
              className={styles.poster}
              style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${poster})`}}
          >
            <div
                onMouseLeave={() => { setInfoMode(false) }}
                className={styles.hoverInfo}
            >
              {infoMode
                  ? (
                      <div className={styles.overview}>
                        {overview}
                      </div>
                  )
                  : (
                      <div>
                        <div
                            role="button"
                            onClick={() => { setIsTrailerVisible(true) }}
                        >
                          <img
                              src={play}
                              alt=""
                              className={styles.playButton}
                          />
                        </div>
                        {
                          isTrailerVisible
                          && (
                              <Modal
                                  callback={setIsTrailerVisible}
                                  movieId={id}
                              />
                          )
                        }
                        <Button onClick={() => setInfoMode(true)}>
                          View Info
                        </Button>
                      </div>
                  )}

            </div>
          </div>

          <Link
              to={searchQuery
                  ? `/movie/${id}/search?q=${searchQuery}`
                  : `/movie/${id}`}
              className={styles.footer}
          >
            <div className={styles.nameAndRating}>
              <div className={styles.name}>
                {movieTitle}
              </div>
              <Rating starsCount={rating}/>
            </div>
            <MovieTags
                allGenres={allGenres}
                genresIds={genresIds}
            />
          </Link>
        </div>
      </div>
  )
})

MovieCard.propTypes = {
  movieName: PropTypes.string.isRequired,
  rating: PropTypes.number,
  genresIds: PropTypes.arrayOf(PropTypes.number),
  poster: PropTypes.string,
  overview: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  allGenres: PropTypes.shape({
    genres: PropTypes.arrayOf(PropTypes.shape(
        {id: PropTypes.number, name: PropTypes.string},
    )),
  }).isRequired,
}

MovieCard.defaultProps = {
  rating: 0,
  genresIds: [],
  poster: null,
}

export default React.memo(MovieCard)
