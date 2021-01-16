import React from 'react'
import styles from './Input.module.scss'

const Input = ({placeholder}) => (
    <input placeholder={placeholder} className={styles.input}/>
)

export default Input