import React, {useState} from 'react'
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

export default Popover
