import { SearchMovie } from "../../logic/datasources/TmdbDatasource"

const MovieCard = ({ movie }: { movie: SearchMovie }) => {
  return (
    <div className="movie-card">
      {movie.title}
    </div>
  )
}

export default MovieCard