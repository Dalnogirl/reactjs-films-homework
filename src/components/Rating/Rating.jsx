import React from 'react'
import PropTypes from 'prop-types'
import styles from './Rating.module.scss'
import star from '../../assets/star.svg'

const Rating = ({ starsCount = 1 }) => {
  const arr = []
  for (let i = 0; i < starsCount; i++) {
    arr.push(<img key={i} src={star} alt="" />)
  }
    return (
      <div className={styles.ratingContainer}>
        {arr}
        <p className={styles.starsCount}>{starsCount}</p>
      </div>
    )
}

Rating.propTypes = {
  starsCount: PropTypes.number.isRequired,
}
export default Rating
