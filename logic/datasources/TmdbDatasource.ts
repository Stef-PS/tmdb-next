import axios from 'axios'

const LOCALE = 'en-US'
const API_URL = 'https://api.themoviedb.org/3'

export interface SearchMovie {
  id: number,
  posterPath: string,
  adult: boolean,
  overview: string,
  releaseDate: string,
  genreIds: number[],
  originalTitle: string,
  originalLanguage: string,
  title: string,
  backdropPath: string,
  popularity: number,
  voteCount: number,
  video: boolean,
  voteAverage: number,
}

export interface SearchMovieResult {
  page: number,
  results: SearchMovie[],
  totalResults: number,
  totalPages: number,
}

export interface Configuration {
  images: {
    baseUrl: string,
    secureBaseUrl: string,
    posterSizes: string[]
  }
}

export const transformSearchMovie = (movie: any): SearchMovie => {
  const {
    id,
    poster_path: posterPath,
    adult,
    overview,
    release_date: releaseDate,
    genre_ids: genreIds,
    original_title: originalTitle,
    original_language: originalLanguage,
    title,
    backdrop_path: backdropPath,
    popularity,
    vote_count: voteCount,
    video,
    vote_average: voteAverage,
  } = movie
  return { id, posterPath, adult, overview, releaseDate, genreIds, originalTitle, originalLanguage, title, backdropPath, popularity, voteCount, video, voteAverage }
}

export class TmdbDatasource {
  private apiKey = process.env.TMDB_API_KEY ?? 'test'
  private options = {
    timeout: 2500,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
  }
  private config: Configuration | null = null

  resetConfiguration() {
    this.config = null
  }

  getConfiguration(): Promise<Configuration> {
    if (this.config) return Promise.resolve(this.config)
    const url = `${API_URL}/configuration?api_key=${this.apiKey}`
    return axios.get(url, this.options)
      .then((response) => {
        const {
          base_url: baseUrl,
          secure_base_url: secureBaseUrl,
          poster_sizes: posterSizes
        } = response.data.images
        this.config = { images: { baseUrl, secureBaseUrl, posterSizes } }
        return this.config
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }

  searchMovie(query: string, page = 1): Promise<SearchMovieResult> {
    const url = `${API_URL}/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}&language=${LOCALE}`
    return axios.get(url, this.options)
      .then(({ data }) => {
        const { results, page, total_results: totalResults, total_pages: totalPages } = data
        return { page, results: results.map(transformSearchMovie), totalResults, totalPages }
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }
}

export const tmdbDatasourceFactory = (): TmdbDatasource => {
  if (!(global as any).__tmdbSingleton__) (global as any).__tmdbSingleton__ = new TmdbDatasource()
  return (global as any).__tmdbSingleton__
}

export default tmdbDatasourceFactory()