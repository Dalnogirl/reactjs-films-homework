import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import styles from './Input.module.scss'
import icon from '../../assets/search.svg'

const Input = ({ placeholder }) => {
  const [inputText, setInputText] = useState('')
  const onInputChange = (e) => {
    setInputText(e.target.value)
  }
  const history = useHistory()

  return (
    <div className={styles.inputContainer}>
      <input value={inputText}
             onChange={(e) => onInputChange(e)}
             placeholder={placeholder}
             className={styles.input}
             data-testid='searchInput'
      />
      <div
        onClick={() => {
          history.push(`/search?q=${inputText}`)
        }}
        className={styles.navLink}
        data-testid='searchButton'
      >
        <img className={styles.icon}
             src={icon}
             alt="Search button"

        />
      </div>
    </div>
  )
}

Input.propTypes = {
  placeholder: PropTypes.string,
}

Input.defaultProps = {
  placeholder: 'Enter something',
}

export default Input
