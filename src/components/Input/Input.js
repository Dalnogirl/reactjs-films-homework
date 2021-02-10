import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import styles from './Input.module.scss'
import icon from '../../assets/search.svg'

const Input = ({placeholder}) => {
  const [inputText, setInputText] = useState('')
  const onInputChange = (e) => {
    setInputText(e.target.value)
  }
  const history = useHistory()

  return (
      <div className={styles.inputContainer}>
        <input
            value={inputText}
            onChange={(e) => onInputChange(e)}
            placeholder={placeholder}
            className={styles.input}
        />
        <div
            onClick={() => {
              history.push(`/search?q=${inputText}`)
            }}
            className={styles.navLink}
        >
          <img className={styles.icon} src={icon} alt=""/>
        </div>
      </div>
  )
}

export default Input
