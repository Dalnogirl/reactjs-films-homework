import React, {useState} from 'react'
import styles from './Dropdown.module.scss'
import {useSelector} from 'react-redux'
import {getGenresSelector, getIsFetching} from '../../../redux/selectors/selectors'
import {NavLink} from 'react-router-dom'
import {urlCreatorForDropdown} from '../functions/functions'

const Dropdown = React.memo(() => {
    let isFetching = useSelector(getIsFetching)
    let [isClicked, setIsClicked] = useState(false)
    let genres = useSelector(getGenresSelector)
    return !isFetching ? <div className={styles.dd_wrapper}>
        <div className={styles.dd_header}
             onClick={() => {
                 isClicked ? setIsClicked(false) : setIsClicked(true)
             }}>
            <div className={styles.dd_header_title}>
                Search By Genre
            </div>
        </div>
        {isClicked && <div className={styles.dd_list}>
            {genres.genres.map((i, idx) => <NavLink onClick={() => {
                setIsClicked(false)
            }} key={idx} to={urlCreatorForDropdown(location, i.id)}
                                                    className={styles.link}>{i.name}</NavLink>)}
        </div>}
    </div> : <div className={styles.dd_header_title}>
        Search By Genre
    </div>

})

export default React.memo(Dropdown)