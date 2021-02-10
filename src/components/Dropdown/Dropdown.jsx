import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Dropdown.module.scss'
import { getGenresSelector, getIsFetching } from '../../redux/selectors/selectors'
import { moviesActions } from '../../redux/moviesReducer'

const Dropdown = React.memo(() => {
  const isFetching = useSelector(getIsFetching)
  const dispatch = useDispatch()
  const [isOpen, setIsOpened] = useState(false)
  const genres = useSelector(getGenresSelector)
  return (
    <div className={styles.dd_wrapper}>
      <div
        className={styles.dd_header}
        onClick={() => {
          isOpen ? setIsOpened(false) : setIsOpened(true)
        }}
      >
        <div className={styles.dd_header_title}>Search By Genre ▼</div>
      </div>
      {isOpen && !isFetching && (
        <div className={styles.dd_list}>
          {genres.genres.map((i, idx) => (
            <div
              onClick={() => {
                setIsOpened(false)
                dispatch(moviesActions.setCurrentGenre(i.id))
              }}
              key={idx}
              className={styles.link}
            >
              {i.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
})

export default React.memo(Dropdown)
