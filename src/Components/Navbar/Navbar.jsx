import React, {useEffect} from 'react'
import styles from './Navbar.module.scss'
import {NavLink} from 'react-router-dom'
import {setGenresObj} from '../../redux/moviesReducer'
import {useDispatch} from 'react-redux'
import Dropdown from '../utils/Dropdown/Dropdown'

const Navbar = () => {
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(setGenresObj())
    }, [])
    return (
        <div className={styles.navbar}>
            <NavLink to={'/filter=top_rated&page=1'}
                     className={styles.navLink}
                     activeClassName={styles.selected}>
                Top Rated
            </NavLink>
            <NavLink to={'/filter=popular&page=1'}
                     className={styles.navLink}
                     activeClassName={styles.selected}>
                Popular
            </NavLink>
            <NavLink to={'/filter=upcoming&page=1'}
                     className={styles.navLink}
                     activeClassName={styles.selected}>
                Upcoming
            </NavLink>
            <Dropdown/>
        </div>
    )
}

export default React.memo(Navbar)