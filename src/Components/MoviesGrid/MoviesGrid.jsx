import React, {useEffect, useRef, useState} from 'react'
import styles from './MoviesGrid.module.scss'
import MovieCard from '../MovieCard/MovieCard'
import {useDispatch, useSelector} from 'react-redux'
import {setGenresArray, setTopRatedMovies} from '../../redux/moviesReducer'
import {getGenresSelector, getMoviesSelector} from '../../redux/selectors/selectors'
import Loader from '../utils/Loader/Loader'

const MoviesGrid = ({}) => {
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(setTopRatedMovies(1))
        dispatch(setGenresArray())
        let options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0
        }
        const handleObserver = (entities) => {
            const target = entities[0]
            if (target.isIntersecting) {
                setPage((page) => page + 1)
            }
        }
        let observer = new IntersectionObserver(handleObserver, options)
        if (loader.current) {
            observer.observe(loader.current)
        }
    }, [])


    let list = useSelector(getMoviesSelector)
    let genres = useSelector(getGenresSelector)

    let [page, setPage] = useState(1) // tracking on which page we currently are

    const loader = useRef(null)


    // useEffect(() => {
    //
    //     let options = {
    //         root: null,
    //         rootMargin: '20px',
    //         threshold: 1.0
    //     }
    //     const observer = new IntersectionObserver(handleObserver, options)
    //     if (loader.current) {
    //         observer.observe(loader.current)
    //     }
    // }, [])

    useEffect(() => {
        dispatch(setTopRatedMovies(page))
        window.scrollTo({
            top: 750,
            behavior: 'smooth'
        })
    }, [page])


    return !list ? <div className={styles.container}>
            <Loader/>
        </div>
        : <div className={styles.container}>
            <div>Top Rated</div>
            <div className={styles.moviesGrid}>
                {list.results.map((item) => <MovieCard key={item.id}
                                                       genres={genres}
                                                       movieName={item.title}
                                                       movieTags={item.genre_ids}
                                                       poster={item.backdrop_path}
                                                       rating={item.vote_average / 2}
                                                       overview={item.overview}
                />)}
            </div>
            <div ref={loader}>
                <h2>Scroll Down To Load More</h2>
            </div>
        </div>
}

export default MoviesGrid