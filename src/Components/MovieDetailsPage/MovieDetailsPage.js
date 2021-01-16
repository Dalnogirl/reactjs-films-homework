import React from 'react'
//import {Rate} from 'antd'
import styles from './MovieDetailsPage.module.scss'
import Button from '../utils/Button/Button'
import Input from '../utils/Input/Input'


const MovieDetailsPage = ({posterUrl, movieName, movieTags}) => {
    const tags = ['Adventure', 'Drama', 'Family', 'Fantasy'] //just a placeholder
    let background = posterUrl //just a placeholder
        ? posterUrl
        : `https://www.newstatesman.com/sites/default/files/styles/cropped_article_image/public/blogs_2016/04/2016_16_film.jpg?itok=K59eDFav`
    return <div className={styles.container}
                style={{backgroundImage: `url(${background})`}}>
        <header className={styles.header}>
            <h1 className={styles.logo}>FILMS</h1>
            <div className={styles.searchContainer}>
                <Input type="text" placeholder={'Search'}/>
                <Button text={`Search`}/>
            </div>
        </header>
        <main className={styles.main}>
            <div className={styles.mainInfo}>
                <p className={styles.movieName}>The Jungle Book</p>
                <div className={styles.movieTagContainer}>
                    {tags.map((item, index) => (
                        <div key={index}
                             className={styles.movieTag}>{item}
                        </div>))}
                </div>
            </div>
            <div className={styles.controls}>
                <Button text={`Watch Now`}/>
                <Button text={`Info`}/>
            </div>
        </main>
    </div>
}

export default MovieDetailsPage