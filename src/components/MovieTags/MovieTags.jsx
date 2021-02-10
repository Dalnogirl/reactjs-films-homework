import React, {useEffect, useState} from 'react'
import styles from './MovieTags.module.scss'

const MovieTags = (({genresNames, genresIds, allGenres}) => {
    let [resultGenres, setResultGenres] = useState([])

    useEffect(() => {
        if (genresNames) {
            setResultGenres(genresNames)
        } else {
            if ('genres' in allGenres)setResultGenres(allGenres.genres.filter(item => genresIds.includes(item.id)))
        }
    }, [allGenres, genresNames])

    return (
        <div className={styles.movieTagContainer}>
            {resultGenres
                .slice(0, 4)
                .map((item, index) => (
                    <div className={styles.movieTag}
                         key={index}>{item.name}
                    </div>))}
        </div>
    )
})

export default React.memo(MovieTags)










