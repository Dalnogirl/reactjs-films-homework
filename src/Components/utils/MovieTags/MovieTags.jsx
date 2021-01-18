import React, {useEffect, useState} from 'react'
import styles from './MovieTags.module.scss'
import Loader from '../Loader/Loader'

const MovieTags = React.memo(({movieTags, genres}) => {
    let [tags, setTags] = useState(null)
    useEffect(() => {
        if (movieTags.every(i => typeof i === 'number')) {
            setTags(genres.genres.filter(item => movieTags.includes(item.id)))
        } else {
            setTags(movieTags)
        }
    }, [])

    return tags ? <div className={styles.movieTagContainer}>
        {tags.map((item, index) => (
            <div key={index} className={styles.movieTag}>
                {item.name}
            </div>))}
    </div> : <Loader/>

})

export default MovieTags










