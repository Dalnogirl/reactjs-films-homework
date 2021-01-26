import {useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {urlHelpers} from '../utils/functions/functions'
import React, {useEffect, useState} from 'react'
import {setTrailerKey} from '../../redux/headerReducer'
import {getTrailerKey} from '../../redux/selectors/selectors'
import styles from './Trailer.module.scss'

 const Trailer = () => {

  const location = useLocation()
  const dispatch = useDispatch()
  let id = urlHelpers.getId(location)

  useEffect(() => {
    dispatch(setTrailerKey(id))
    setIsTrailerOnScreen(true)
    debugger
  }, [id])
   console.log(location)

  let trailerKey = useSelector(getTrailerKey)
  let [isTrailerOnScreen, setIsTrailerOnScreen] = useState(true)
  console.log('trailer Key', trailerKey)

  return isTrailerOnScreen &&
      <div className={styles.iframeContainer}
           onClick={() => setIsTrailerOnScreen(false)}>
        {trailerKey && <iframe src={`http://www.youtube.com/embed/${trailerKey}`}
                 frameBorder="0"
                 className={styles.trailerIframe}

                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 allowFullScreen/>}
      </div>

}

export default Trailer