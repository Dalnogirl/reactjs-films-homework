import React, {useState} from 'react'
import styles from './MovieCard.module.scss'
import play from '../../assets/play (1).svg'
import Button from '../utils/Button/Button'
import MovieTags from '../utils/MovieTags/MovieTags'
import Rating from '../utils/Rating/Rating'
import {useHistory} from 'react-router-dom'

const MovieCard = React.memo(({movieName, rating, movieTags, poster, overview, genres, id}) => {
    if (movieName.length > 14) movieName = movieName.slice(0, 14) + '...'
    let [hover, setHover] = useState(false)
    let [infoMode, setInfoMode] = useState(false)
    const history = useHistory()

    const url = history.location.pathname.match(/^\/(\w+)/gi)[0]

    return (
        <div className={styles.card}>
            <div className={styles.poster}
                 onMouseEnter={() => setHover(true)}
                 style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${poster})`}}>
                {hover &&
                <div onMouseLeave={() => {
                    setHover(false)
                    setInfoMode(false)
                }} className={styles.hoverInfo}>
                    {infoMode ? <div className={styles.overview}>
                            {overview}
                        </div>
                        : <div>
                            <img src={play} alt="" className={styles.playButton}/>
                            <Button onClick={() => setInfoMode(true)}>
                                View Info
                            </Button>
                        </div>}
                </div>}
            </div>

            <footer className={styles.footer}>
                <div className={styles.nameAndRating}>
                    <div className={styles.name}
                         onClick={() => {
                             history.push(`${url}/${id}`)
                         }}>{movieName}</div>
                    <Rating starsCount={rating}/>
                </div>
                <MovieTags movieTags={movieTags} genres={genres}/>
            </footer>
        </div>
    )
})

export default MovieCard