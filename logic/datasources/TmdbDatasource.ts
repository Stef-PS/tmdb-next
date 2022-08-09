import axios from 'axios'

const LOCALE = 'en-US'
const API_URL = 'https://api.themoviedb.org/3'

export interface SearchMovie {
  id: number,
  posterPath: string,
  overview: string,
  releaseDate: string,
  originalTitle: string,
  originalLanguage: string,
  title: string,
  popularity: number,
  voteCount: number,
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
    poster_path,
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

  async searchMovie(query: string, page = 1): Promise<SearchMovieResult> {
    const url = `${API_URL}/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}&language=${LOCALE}&include_adult=false`
    return axios.get(url, this.options)
      .then(({ data }) => {
        const { results, page, total_results: totalResults, total_pages: totalPages } = data
        return { page, results: results.map((movie: any) => transformSearchMovie(movie)), totalResults, totalPages }
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