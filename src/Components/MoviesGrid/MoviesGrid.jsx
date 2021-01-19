import React, {useEffect, useRef, useState} from 'react'
import styles from './MoviesGrid.module.scss'
import MovieCard from '../MovieCard/MovieCard'
import {useDispatch, useSelector} from 'react-redux'
import {setGenresArray} from '../../redux/moviesReducer'
import {getGenresSelector, getMoviesSelector} from '../../redux/selectors/selectors'
import Loader from '../utils/Loader/Loader'

const MoviesGrid = ({setMovies}) => {
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(setMovies(1))
        dispatch(setGenresArray())
        let options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0
        }
        const handleObserver = (entities) => {
            debugger
            const target = entities[0]
            if (target.isIntersecting) {
                setPage((page) => page + 1)
            }
        }
        let observer = new IntersectionObserver(handleObserver, options)
        if (loader.current) {
            observer.observe(loader.current)
        }

    }, [setMovies])

    let list = useSelector(getMoviesSelector)
    let genres = useSelector(getGenresSelector)

    let [page, setPage] = useState(1) // tracking on which page we currently are

    const loader = useRef(null)

    useEffect(() => {
        dispatch(setMovies(page))
        window.scrollTo({
            top: 750,
            behavior: 'smooth'
        })
    }, [page])

    return !list ? <div className={styles.container}>
            <Loader/>
        </div>
        : <div className={styles.container}>
            <div className={styles.moviesGrid}>
                {list.results.map((item) => <MovieCard key={item.id}
                                                       id={item.id}
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