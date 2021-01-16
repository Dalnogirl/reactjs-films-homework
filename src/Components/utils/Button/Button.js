import React from 'react'
import styles from './Button.module.scss'

const Button = ({text, onClick}) => (
    <div className={styles.button}
         onClick={onClick}>
        {text}
    </div>
)

export default Button