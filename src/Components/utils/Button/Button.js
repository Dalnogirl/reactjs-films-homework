import React from 'react'
import styles from './Button.module.scss'

const Button = (props) => (
    <div className={styles.button}
         style={{width:props.width}}
         onClick={props.onClick}>
        {props.children}
    </div>
)

export default Button