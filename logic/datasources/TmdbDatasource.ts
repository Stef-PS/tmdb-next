import axios from 'axios'

const LOCALE = 'en-US'
const API_URL = 'https://api.themoviedb.org/3'

export interface SearchMovie {
  id: number,
  poster_path: string,
  adult: boolean,
  overview: string,
  release_date: string,
  genre_ids: number[],
  original_title: string,
  original_language: string,
  title: string,
  backdrop_path: string,
  popularity: number,
  vote_count: number,
  video: boolean,
  vote_average: number,
}

export interface SearchMovieResult {
  page: number,
  results: SearchMovie[],
  total_results: number,
  total_pages: number,
}

export interface Configuration {
  images: {
    baseUrl: string,
    secureBaseUrl: string,
    posterSizes: string[]
  }
}

export class TmdbDatasource {
  private apiKey = process.env.TMDB_API_KEY ?? 'test'
  private options = {
    timeout: 2500,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
  }

  searchMovie(query: string, page = 1): Promise<any> {
    const url = `${API_URL}/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}&language=${LOCALE}`
    return axios.get(url, this.options)
      .then((response) => response.data)
      .catch(error => {
        return Promise.reject(error)
      })
  }

  getConfiguration(): Promise<Configuration> {
    const url = `${API_URL}/configuration?api_key=${this.apiKey}`
    return axios.get(url, this.options)
      .then((response) => {
        const {
          base_url: baseUrl,
          secure_base_url: secureBaseUrl,
          poster_sizes: posterSizes
        } = response.data.images
        return { images: { baseUrl, secureBaseUrl, posterSizes } }
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }
}
