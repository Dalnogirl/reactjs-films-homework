import React from 'react'
import PropTypes from 'prop-types'
import styles from './Rating.module.scss'
import star from '../../assets/star.svg'

const Rating = ({starsCount = 1}) => (
    <div className={styles.ratingContainer}>
      {Array(Math.round(starsCount)).fill(<img src={star} alt=""/>)}
      <p className={styles.starsCount}>{starsCount}</p>
    </div>
)

Rating.propTypes = {
  starsCount: PropTypes.number.isRequired,
}
export default Rating
