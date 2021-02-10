import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from './Navbar.module.scss'
import { moviesActions, setGenresObj, setMovies } from '../../redux/moviesReducer'
import Dropdown from '../Dropdown/Dropdown'

const linksArray = ['top_rated', 'popular', 'upcoming']

const Navbar = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(setGenresObj())
  }, [])
  return (
    <div className={styles.navbar}>
      {linksArray.map((item, index) => (
        <div
          key={index}
          className={styles.navLink}
          onClick={() => {
            history.push('')
            dispatch(moviesActions.setCurrentPage(1))
            dispatch(setMovies({ filter: item }))
          }}
        >
          {item[0].toUpperCase() + item.replace('_', ' ').slice(1)}
        </div>
      ))}
      <Dropdown />
    </div>
  )
}

export default React.memo(Navbar)
