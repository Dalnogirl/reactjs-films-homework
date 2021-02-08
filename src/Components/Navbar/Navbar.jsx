import React, {useEffect} from 'react'
import {NavLink, useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import styles from './Navbar.module.scss'
import {setGenresObj} from '../../redux/moviesReducer'
import Dropdown from '../utils/Dropdown/Dropdown'
import {urlHelpers} from '../utils/functions/functions'

const Navbar = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const filter = urlHelpers.getFilter(location)
  useEffect(() => {
    dispatch(setGenresObj())
  }, [])
  return (
      <div className={styles.navbar}>
        <NavLink
            to="/?filter=top_rated&page=1"
            className={filter === 'top_rated'
                ? styles.selected
                : styles.navLink}
        >
          Top Rated
        </NavLink>
        <NavLink
            to="/?filter=popular&page=1"
            className={filter === 'popular'
                ? styles.selected
                : styles.navLink}
        >
          Popular
        </NavLink>
        <NavLink
            to="/?filter=upcoming&page=1"
            className={filter === 'upcoming'
                ? styles.selected
                : styles.navLink}
        >
          Upcoming
        </NavLink>
        <Dropdown/>
      </div>
  )
}

export default React.memo(Navbar)
