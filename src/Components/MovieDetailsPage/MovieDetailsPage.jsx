import React, {useEffect} from 'react'
import styles from './MovieDetailsPage.module.scss'
import Button from '../utils/Button/Button'
import Input from '../utils/Input/Input'
import Rating from '../utils/Rating/Rating'
import Popover from '../utils/Popover/Popover'
import MovieTags from '../utils/MovieTags/MovieTags'
import {useDispatch, useSelector} from 'react-redux'
import {getMovieInfo} from '../../redux/headerReducer'
import {getMovieInfoSelector} from '../../redux/selectors/selectors'


const MovieDetailsPage = ({}) => {
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMovieInfo(550))
    }, [])

    let movieInfo = useSelector(getMovieInfoSelector)

    return movieInfo && <div className={styles.container}
                style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movieInfo.backdrop_path})`}}>
        <header className={styles.header}>
            <h1 className={styles.logo}>FILMS</h1>
            <div className={styles.searchContainer}>
                <Input type="text" placeholder={'Search'}/>
                <Button>Search</Button>
            </div>
        </header>
        <main className={styles.main}>
            <div className={styles.mainInfo}>
                <p className={styles.movieName}>
                    {movieInfo.original_title}
                </p>
                <div className={styles.movieTagContainer}>
                    <MovieTags movieTags={movieInfo.genres}/>
                </div>
                <Rating starsCount={movieInfo.vote_average / 2}/>
            </div>
            <div className={styles.controls}>
                <Button>Watch now</Button>
                <Popover text={`Info`}>
                    {movieInfo.overview}
                </Popover>
            </div>
        </main>
    </div>
}

export default MovieDetailsPage