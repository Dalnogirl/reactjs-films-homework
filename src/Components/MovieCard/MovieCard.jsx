import React, {useState} from 'react'
import styles from './MovieCard.module.scss'
import play from '../../assets/play (1).svg'
import Button from '../utils/Button/Button'
import MovieTags from '../utils/MovieTags/MovieTags'
import Rating from '../utils/Rating/Rating'

const MovieCard = React.memo(({movieName, rating, movieTags, poster, overview, genres}) => {
    let [viewInfoMode, setViewInfoMode] = useState(false)
    if (movieName.length > 14) movieName = movieName.slice(0,14) + '...'
    return viewInfoMode
        ? <div className={styles.movieCard}>
            <div className={styles.overviewMode}>
                {overview}
                <Button width={100} onClick={()=>{setViewInfoMode(false)}}>Go Back</Button>
            </div>
            <footer className={styles.footer}>
                <div className={styles.movieNameAndRating}>
                    <p className={styles.movieName}>
                        {movieName}
                    </p>
                    <Rating starsCount={rating}/>
                </div>
                <MovieTags movieTags={movieTags}/>
            </footer>
        </div>
        :<div className={styles.movieCard}>
            <div className={styles.smallPoster} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${poster})`}}>
                <div className={styles.onHoverInfo}>
                    <img src={play} alt="" className={styles.playButton}/>
                    <Button onClick={()=>setViewInfoMode(true)}>
                        View Info
                    </Button>
                </div>
            </div>
            <footer className={styles.footer}>
                <div className={styles.movieNameAndRating}>
                    <p className={styles.movieName}>
                        {movieName}
                    </p>
                    <Rating starsCount={rating}/>
                </div>
                <MovieTags movieTags={movieTags} genres={genres}/>
            </footer>
        </div>

})

export default MovieCard