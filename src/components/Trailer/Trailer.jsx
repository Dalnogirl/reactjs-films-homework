import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { setTrailerKey } from '../../redux/headerReducer'
import { getTrailerKey } from '../../redux/selectors/selectors'
import styles from './Trailer.module.scss'

const Trailer = ({ callback, movieId }) => {
  const dispatch = useDispatch()
  const id = useParams().id || movieId
  useEffect(() => {
    dispatch(setTrailerKey(id))
  }, [id])
  const trailerKey = useSelector(getTrailerKey)

  return (
    <div className={styles.iframeContainer} onClick={() => callback(false)}>
      {trailerKey ? (
        <iframe
          title="trailer"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          frameBorder="0"
          className={styles.trailerIframe}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        'Trailer is not found 😢'
      )}
    </div>
  )
}

Trailer.propTypes = {
  callback: PropTypes.func.isRequired,
  movieId: PropTypes.number.isRequired,
}

export default Trailer
