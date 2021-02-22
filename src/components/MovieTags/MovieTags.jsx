import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './MovieTags.module.scss'

const MovieTags = ({ genresNames, genresIds, allGenres }) => {
  const [resultGenres, setResultGenres] = useState([])

  useEffect(() => {
    if (genresNames) {
      setResultGenres(genresNames)
    } else if ('genres' in allGenres) {
      setResultGenres(allGenres.genres.filter((item) => genresIds.includes(item.id)))
    }
  }, [allGenres, genresNames])

  return (
    <div className={styles.movieTagContainer}>
      {resultGenres.slice(0, 4).map((item, index) => (
        <div className={styles.movieTag} key={index}>
          {item.name}
        </div>
      ))}
    </div>
  )
}

MovieTags.propTypes = {
  genresNames: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })),
  genresIds: PropTypes.arrayOf(PropTypes.number),
  allGenres: PropTypes.shape({
    genres: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })),
  }),
}

MovieTags.defaultProps = {
  genresNames: null,
  allGenres: null,
  genresIds: null,
}
export default React.memo(MovieTags)
