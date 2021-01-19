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
            <Button widt={props.width} onClick={() => setActiveMode(false)}>
                {props.text}
            </Button>
        </div>
        : <Button width={props.width} onClick={() => setActiveMode(true)}>
            {props.text}
        </Button>
}

export default Popover