import MoviePoster from "../MoviePoster"
import Rating from '../Rating'
import { Configuration, SearchMovie } from "../../logic/datasources/TmdbDatasource"
import styles from './MovieCard.module.css'

interface MovieCardProps {
  movie: SearchMovie,
  config: Configuration
}

const MovieCard = ({ movie, config }: MovieCardProps) => {
  const image = { width: 342, height: 513 }
  const posterUrl = `${config.images.secureBaseUrl}w${image.width}${movie.posterPath}`

  return (
    <li className={styles.card}>
      <MoviePoster className={styles.poster} imageUrl={posterUrl} fallbackUrl="/clapperboard.jpg" alt={movie.title} aspectRatio="2/3" />
      <div className={styles.info}>
        <div className={styles.title}>{movie.title}</div>
        <div className={styles.aside}>
          <div className={styles.year}>{movie.releaseDate.substring(0, 4)}</div>
          <Rating rate={movie.voteAverage} />
        </div>
      </div>
    </li>
  )
}

export default MovieCard
