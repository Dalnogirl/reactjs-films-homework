import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styles from './Popover.module.scss'
import Button from '../Button/Button'

const Popover = ({children, width, text}) => {
  const [activeMode, setActiveMode] = useState(false)
  return activeMode
      ? (
          <div className={styles.popoverContainer}>
            <div className={styles.additionalInfo}>
              <div className={styles.paddingContainer}>
                {children}
              </div>
            </div>
            <Button width={width} onClick={() => setActiveMode(false)}>
              {text}
            </Button>
          </div>
      )
      : (
          <Button width={width} onClick={() => setActiveMode(true)}>
            {text}
          </Button>
      )
}

Popover.propTypes = {
  children: PropTypes.any,
  width: PropTypes.number,
  text: PropTypes.string.isRequired,
}
Popover.defaultProps = {
  children: null,
  width: null,
}

export default Popover
