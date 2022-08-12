import MovieCard from '../MovieCard'
import { Configuration, SearchMovie } from "../../logic/datasources/TmdbDatasource"
import styles from './MovieList.module.css'

interface MovieListProps {
  movies: SearchMovie[],
  config: Configuration
}

const MovieList = ({ movies, config }: MovieListProps) => {
  return (
    <ul className={styles.movieList}>
      {movies.map((movie: SearchMovie) => <MovieCard key={movie.id} movie={movie} config={config} />)}
    </ul>
  )
}

export default MovieList
