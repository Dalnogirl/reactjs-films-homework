import React, {useState} from 'react'
import styles from './Input.module.scss'
import {NavLink, useHistory} from 'react-router-dom'
import icon from '../../../assets/search.svg'

const Input = ({placeholder}) => {
    let history = useHistory()
    let [inputText, setInputText] = useState('')
    let onInputChange = (e) => {
        setInputText(e.target.value)
    }

    return (
        <div className={styles.inputContainer}>
            <input value={inputText}
                   onChange={e => onInputChange(e)}
                   placeholder={placeholder}
                   className={styles.input}/>
            <NavLink to={`/search?q=${inputText}&page=1`}
            className={styles.navLink}>
                <img className={styles.icon} src={icon} alt=""/>
            </NavLink>
        </div>
    )
}

export default Input