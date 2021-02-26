import React from 'react'
import styles from './Loader.module.scss'

const Loader = () => (
  <div className={styles.lds_ripple}>
    <div />
    <div />
  </div>
)

export default Loader
