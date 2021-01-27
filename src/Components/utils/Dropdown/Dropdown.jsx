import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import styles from './Dropdown.module.scss'
import {
  getGenresSelector,
  getIsFetching,
} from '../../../redux/selectors/selectors'
import {urlCreatorForDropdown} from '../functions/functions'

const Dropdown = React.memo(() => {
  const isFetching = useSelector(getIsFetching)
  const [isClicked, setIsClicked] = useState(false)
  const genres = useSelector(getGenresSelector)
  return !isFetching ? (
      <div className={styles.dd_wrapper}>
        <div
            className={styles.dd_header}
            onClick={() => {
              isClicked ? setIsClicked(false) : setIsClicked(true)
            }}
        >
          <div className={styles.dd_header_title}>
            Search By Genre
          </div>
        </div>
        {isClicked && (
            <div className={styles.dd_list}>
              {genres.genres.map((i, idx) => (
                  <NavLink
                      onClick={() => {
                        setIsClicked(false)
                      }}
                      key={idx}
                      to={urlCreatorForDropdown(location, i.id)}
                      className={styles.link}
                  >
                    {i.name}
                  </NavLink>
              ))}
            </div>
        )}
      </div>
  ) : (
      <div className={styles.dd_header_title}>
        Search By Genre
      </div>
  )
})

export default React.memo(Dropdown)
