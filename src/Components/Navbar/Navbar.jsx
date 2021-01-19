import React, {useEffect} from 'react'
import styles from './Navbar.module.scss'
import {NavLink} from 'react-router-dom'
import {setGenresArray} from '../../redux/moviesReducer'
import {useDispatch} from 'react-redux'
import Dropdown from '../utils/Dropdown/Dropdown'

const Navbar = () => {
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(setGenresArray)
    }, [])
    return (
        <div className={styles.navbar}>
            <NavLink to={'/topRated'}
                     className={styles.navLink}
                     activeClassName={styles.selected}>
                Top Rated
            </NavLink>
            <NavLink to={'/popular'}
                     className={styles.navLink}
                     activeClassName={styles.selected}>
                Popular
            </NavLink>
            <Dropdown></Dropdown>
        </div>
    )
}

export default Navbar