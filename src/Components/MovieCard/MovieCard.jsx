import React, {useState} from 'react'
import styles from './MovieCard.module.scss'
import play from '../../assets/play (1).svg'
import Button from '../utils/Button/Button'
import MovieTags from '../utils/MovieTags/MovieTags'
import Rating from '../utils/Rating/Rating'
import {Link, useLocation} from 'react-router-dom'
import {urlCreatorForCard} from '../utils/functions/functions'

const MovieCard = (({movieName, rating, genresIds, poster, overview, id, allGenres}) => {
  if (movieName.length > 14) movieName = movieName.slice(0, 14) + '...'
  let [hover, setHover] = useState(false)
  let [infoMode, setInfoMode] = useState(false)
  const location = useLocation()
  let link = urlCreatorForCard(location, id) // no id in current url, so we should pass id as argument
  console.log(link)

  return (
      <div className={styles.cardContainer}>
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
                    <Link to={`${link}/trailer`}><img src={play} alt=""
                                                      className={styles.playButton}/></Link>
                    <Button onClick={() => setInfoMode(true)}>
                      View Info
                    </Button>
                  </div>}

            </div>}
          </div>

          <Link to={link} className={styles.footer}>
            <div className={styles.nameAndRating}>
              <div className={styles.name}
              >{movieName}</div>

              <Rating starsCount={rating}/>
            </div>
            <MovieTags allGenres={allGenres}
                       genresIds={genresIds}/>
          </Link>
        </div>
      </div>
  )
})

export default React.memo(MovieCard)