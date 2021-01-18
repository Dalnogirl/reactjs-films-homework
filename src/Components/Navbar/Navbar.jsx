import React from 'react'
import styles from './Navbar.module.scss'
import {NavLink} from 'react-router-dom'

const Navbar =() => {
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
        </div>
    )
}

export default Navbar