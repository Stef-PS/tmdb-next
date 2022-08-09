import Image from "next/image"
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
      <div className={styles.poster}>
        <Image src={posterUrl} alt={movie.title} layout="responsive" width={image.width} height={image.height} />
      </div>
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
