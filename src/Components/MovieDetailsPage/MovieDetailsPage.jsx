import React, {useEffect} from 'react'
import styles from './MovieDetailsPage.module.scss'
import Button from '../utils/Button/Button'
import Rating from '../utils/Rating/Rating'
import Popover from '../utils/Popover/Popover'
import MovieTags from '../utils/MovieTags/MovieTags'
import {useDispatch, useSelector} from 'react-redux'
import {getMovieInfo} from '../../redux/headerReducer'
import { getIsHeaderFetching, getMovieInfoSelector} from '../../redux/selectors/selectors'
import {useLocation} from 'react-router-dom'
import Loader from '../utils/Loader/Loader'
import {urlHelpers} from '../utils/functions/functions'

const MovieDetailsPage = () => {
    let dispatch = useDispatch()
    let location = useLocation()
    let isFetching = useSelector(getIsHeaderFetching)

    useEffect(() => {
        let movieId = urlHelpers.getId(location)
        if (movieId) {
            dispatch(getMovieInfo(movieId))
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }, [location])


    let movieInfo = useSelector(getMovieInfoSelector)

    return !isFetching && movieInfo ? <div className={styles.container}
                            style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movieInfo.backdrop_path})`}}>
        <main className={styles.main}>
            <div className={styles.mainInfoWrapper}>
                <p className={styles.movieName}>
                    {movieInfo.title}
                </p>
                <div className={styles.movieTagContainer}>
                    <MovieTags genresNames={movieInfo.genres}/>
                </div>
                <Rating starsCount={movieInfo.vote_average / 2}/>
            </div>
            <div className={styles.controls}>
                <Button width={70}>Watch now</Button>
                <Popover width={70} text={`Info`}>
                    {movieInfo.overview}
                </Popover>
            </div>
        </main>
    </div> : <div className={styles.container}><Loader/></div>
}

export default MovieDetailsPage