import axios from 'axios'
import { SearchMovieResult } from '../interfaces/SearchMovie'
import { Configuration } from '../interfaces/Configuration'
import { Movie } from '../interfaces/Movie'
import { transformMovie, transformSearchMovie } from '../utils/MovieUtils'

const LOCALE = 'en-US'
const API_URL = 'https://api.themoviedb.org/3'

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

  async getMovie(id: number): Promise<Movie> {
    const url = `${API_URL}/movie/${id}?api_key=${this.apiKey}&language=${LOCALE}`
    return axios.get(url, this.options)
      .then(({ data }) => {
        return transformMovie(data)
      }).catch(error => {
        return Promise.reject(error)
      })
  }
}

export const tmdbDatasourceFactory = (): TmdbDatasource => {
  if (!(global as any).__tmdbSingleton__) (global as any).__tmdbSingleton__ = new TmdbDatasource()
  return (global as any).__tmdbSingleton__
}

export default tmdbDatasourceFactory()