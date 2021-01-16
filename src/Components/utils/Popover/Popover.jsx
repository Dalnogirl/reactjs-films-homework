import React, {useState} from 'react'
import styles from './Popover.module.scss'
import Button from '../Button/Button'

const Popover = (props) => {
    let [activeMode, setActiveMode] = useState(false)
    return activeMode
        ? <div className={styles.popoverContainer}>
            <div className={styles.additionalInfo}>
                <div className={styles.paddingContainer}>
                    {props.children}
                </div>
            </div>
            <Button text={props.text}
                    onClick={() => setActiveMode(false)}/>
        </div>
        : <Button text={props.text}
                  onClick={() => setActiveMode(true)}/>


}

export default Popover