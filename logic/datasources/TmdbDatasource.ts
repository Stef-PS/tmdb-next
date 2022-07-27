import axios from 'axios'

const LOCALE = 'fr-FR'

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

export class TmdbDatasource {
  private apiKey = process.env.TMDB_API_KEY ?? 'test'
  private options = {
    baseUrl: 'https://api.themoviedb.org/3',
    timeout: 2500,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
  }

  searchMovie(query: string, page = 1): Promise<any> {
    const url = `/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}&language=${LOCALE}`
    return axios.get(url, this.options)
      .then((response) => response.data)
      .catch(error => {
        return Promise.reject(error)
      })
  }
}
