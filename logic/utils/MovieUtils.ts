import { BelongsToCollection, Genre, Movie, ProductionCompany, ProductionCountry, SpokenLanguage } from "../interfaces/Movie"
import { SearchMovie } from "../interfaces/SearchMovie"

export const transformSearchMovie = (movie: any): SearchMovie => {
  const {
    id,
    overview,
    release_date: releaseDate,
    original_title: originalTitle,
    original_language: originalLanguage,
    title,
    popularity,
    poster_path: posterPath,
    vote_count: voteCount,
    vote_average: voteAverage,
  } = movie
  return { id, posterPath, overview, releaseDate, originalTitle, originalLanguage, title, popularity, voteCount, voteAverage }
}

export const transformMovie = (movie: any): Movie => {
  const belongsToCollection: BelongsToCollection = {
    id: movie.belongs_to_collection.id,
    name: movie.belongs_to_collection.name,
    posterPath: movie.belongs_to_collection.poster_path,
    backdropPath: movie.belongs_to_collection.backdrop_path
  }

  const genres: Genre[] = movie.genres

  const productionCompanies: ProductionCompany[] = movie.production_companies.map(
    ({ id, logo_path: logoPath, name, origin_country: originCountry }: any) => 
      ({ id, logoPath, name, originCountry })
  )

  const productionCountries: ProductionCountry[] = movie.production_countries.map(
    ({ iso_3166_1: iso3166_1, name }: any) => ({ iso3166_1, name })
  )

  const spokenLanguages: SpokenLanguage[] = movie.spoken_languages.map(
    ({ english_name: englishName, iso_639_1: iso639_1, name }: any) => ({ englishName, iso639_1, name })
  )

  const {
    adult,
    backdrop_path: backdropPath,
    budget,
    homepage,
    id,
    imdb_id: imdbId,
    original_language: originalLanguage,
    original_title: originalTitle,
    overview,
    popularity,
    poster_path: posterPath,
    release_date: releaseDate,
    revenue,
    runtime,
    status,
    tagline,
    title,
    video,
    vote_average: voteAverage,
    vote_count: voteCount,
  } = movie

  return {
    adult,
    backdropPath,
    belongsToCollection,
    budget,
    genres,
    homepage,
    id,
    imdbId,
    originalLanguage,
    originalTitle,
    overview,
    popularity,
    posterPath,
    productionCompanies,
    productionCountries,
    releaseDate,
    revenue,
    runtime,
    spokenLanguages,
    status,
    tagline,
    title,
    video,
    voteAverage,
    voteCount,
  }
}
