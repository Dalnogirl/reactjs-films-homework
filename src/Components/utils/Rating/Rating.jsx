import React from 'react'
import styles from './Rating.module.scss'
import star from '../../../assets/star.svg'

const Rating = ({starsCount = 1}) => (
    <div className={styles.ratingContainer}>
        {Array(Math.round(starsCount)).fill(<img src={star} alt=""/>)}
        <p className={styles.starsCount}>{starsCount}</p>
    </div>
)

export default Rating