import {useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import React, {useEffect} from 'react'
import {urlHelpers} from '../utils/functions/functions'
import {setTrailerKey} from '../../redux/headerReducer'
import {getTrailerKey} from '../../redux/selectors/selectors'
import styles from './Trailer.module.scss'

const Trailer = ({callback, movieId}) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const id = urlHelpers.getId(location) || movieId
  useEffect(() => {
    dispatch(setTrailerKey(id))
  }, [id])
  const trailerKey = useSelector(getTrailerKey)

  return (
      <div
          className={styles.iframeContainer}
          onClick={() => callback(false)}
      >
        {trailerKey
        && (
            <iframe
                src={`http://www.youtube.com/embed/${trailerKey}`}
                frameBorder="0"
                className={styles.trailerIframe}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        )}
      </div>
  )
}

export default Trailer
