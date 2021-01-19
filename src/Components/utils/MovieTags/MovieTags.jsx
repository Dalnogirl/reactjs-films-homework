import React, {useEffect, useState} from 'react'
import styles from './MovieTags.module.scss'
import Loader from '../Loader/Loader'

const MovieTags = ({movieTags, genres}) => {
    let [tags, setTags] = useState(null)
    useEffect(() => {
        if (genres) {
            if (genres) setTags(genres.genres.filter(item => movieTags.includes(item.id)))
        } else {
            setTags(movieTags)
        }
    }, [movieTags])

    return tags ? <div className={styles.movieTagContainer}>
        {tags.slice(0, 4).map((item, index) => (
            <div key={index} className={styles.movieTag}>
                {item.name}
            </div>))}
    </div> : <Loader/>

}

export default MovieTags










