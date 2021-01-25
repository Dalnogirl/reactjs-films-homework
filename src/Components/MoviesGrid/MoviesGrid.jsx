import React, {useEffect, useRef, useState} from 'react'
import styles from './MoviesGrid.module.scss'
import MovieCard from '../MovieCard/MovieCard'
import {useHistory, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setGenresObj, setMovies} from '../../redux/moviesReducer'
import {getGenresSelector, getIsFetching, getMoviesSelector} from '../../redux/selectors/selectors'
import Loader from '../utils/Loader/Loader'
import {debouncedUrlCreatorForPagination, urlHelpers} from '../utils/functions/functions'

const MoviesGrid = ({}) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const filter = urlHelpers.getFilter(location)
    const page = urlHelpers.getPage(location)
    const history = useHistory()
    let allGenres = useSelector(getGenresSelector)
    let isFetching = useSelector(getIsFetching)
    let genre = urlHelpers.getGenre(location)

    useEffect(() => {
        dispatch(setMovies(location))
        dispatch(setGenresObj())

        window.scrollTo({
            top: 100,
            behavior: 'smooth'
        })
    }, [filter, page, genre])

    let list = useSelector(getMoviesSelector)

    const ref = useRef(null)
    // const handleObserver = (entities) => {
    //     const target = entities[0]
    //     if (target.isIntersecting) {
    //         if (!isFetching) {
    //             let url = debouncedUrlCreatorForPagination(location)
    //             console.log('pagination url ', url)
    //             if (url !== 'debounced') {
    //                 history.push(url)
    //             }
    //         }
    //     }
    // }
    // let options = {
    //     root: null,
    //     rootMargin: '20px',
    //     threshold: 0.1
    // }
    // let observer = new IntersectionObserver(handleObserver, options)
    //
    // if (ref.current) {
    //     observer.observe(ref.current)
    // }


    const onScreen = useOnScreen(ref)

    useEffect(() => { //using custom hook
        console.log(onScreen)
    }, [onScreen])

    // useEffect(() => {
    //     const observer = new IntersectionObserver(
    //         ([entry]) => {
    //             console.log('ya rodilsa');
    //
    //             if (entry.isIntersecting) {
    //                 //here i can do something
    //                 debugger
    //                 console.log('It works!')
    //             }
    //         },
    //         {
    //             root: null,
    //             rootMargin: "0px",
    //             threshold: 0.1
    //         }
    //     );
    //     if (ref.current) {
    //         observer.observe(ref.current);
    //     }
    // }, [ref]);


    return isFetching ? <Loader/>

        : <div className={styles.container}>
            <div className={styles.moviesGrid}>
                {list && list.results.map((item) => <MovieCard key={item.id}
                                                               id={item.id}
                                                               movieName={item.title}
                                                               genresIds={item.genre_ids}
                                                               poster={item.poster_path}
                                                               rating={item.vote_average / 2}
                                                               overview={item.overview}
                                                               allGenres={allGenres}
                />)}
            </div>
            <div ref={ref} onClick={()=>{
                if (!isFetching) {
                    let url = debouncedUrlCreatorForPagination(location)
                    console.log('pagination url ', url)
                    if (url !== 'debounced') {
                        history.push(url)
                    }
                } // todo onScroll pagination
            }}>
                <h2> Click To Load More</h2>
            </div>
        </div>
}


function useOnScreen(ref) {

    const [isIntersecting, setIntersecting] = useState(false)

    const observer = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting)
    )
    useEffect(() => {
        observer.observe(ref.current)
        return () => {
            observer.disconnect()
        }
    }, [])

    return isIntersecting
}


export default React.memo(MoviesGrid)