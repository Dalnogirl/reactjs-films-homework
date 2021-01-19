import React, {useState} from 'react'
import styles from './Dropdown.module.scss'
import {useSelector} from 'react-redux'
import Loader from '../Loader/Loader'
import {getGenresSelector} from '../../../redux/selectors/selectors'
import Link from 'react-router-dom/modules/Link'
import {NavLink} from 'react-router-dom'

const Dropdown = React.memo(() => {
    let [isHovered, setIsHovered] = useState(false)

    let genres = useSelector(getGenresSelector)
    if (genres) {
        genres = genres.genres.map(i => i.name)
        console.log(genres)
    }

    return genres ? <div className={styles.dd_wrapper}>
        <div className={styles.dd_header}
             onMouseEnter={() => setIsHovered(true)}
             >
            <div className={styles.dd_header_title}>
                Search By Genre
            </div>
        </div>
        {isHovered && <div className={styles.dd_list}
              onMouseLeave={() => setIsHovered(false)}>
            {genres.map((i,idx) => <NavLink key={idx} to={'/'} className={styles.link}>{i}</NavLink>)}
        </div>}
    </div> : <Loader/>

})

export default Dropdown