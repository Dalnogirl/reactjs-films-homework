import React from 'react'
import styles from './Button.module.scss'

const Button = ({width, children, onClick}) => (
    <div
        className={styles.button}
        style={{width}}
        onClick={onClick}
    >
      {children}
    </div>
)

export default Button
