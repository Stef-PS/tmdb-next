import axios, { AxiosInstance } from 'axios'
import { TmdbDatasource } from './TmdbDatasource'
import { getConfigurationMock, searchMovieResultMock } from './tmdbDatasource.mock'

jest.mock('axios', () => ({
  get: jest.fn()
}))
const mockedAxios = axios as jest.Mocked<typeof axios>
const tmdb = new TmdbDatasource()

describe('Tmdb Client', () => {
  describe('saerchMovie', () => {
    it('should perform a movie search with the right parameters', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: searchMovieResultMock('search', 3, 20, 40) })
      await tmdb.searchMovie('search', 1)
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/search/movie?api_key=test&query=search&page=1&language=en-US',
        { timeout: 2500, headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }
      )
    })

    it('should return a valid movie search', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: searchMovieResultMock('search', 3, 20, 40) })
      const result = await tmdb.searchMovie('search', 1)
      expect(result).toEqual(searchMovieResultMock('search', 3, 20, 40))
    })

    it('should return the second page results', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: searchMovieResultMock('search', 2, 20, 40) })
      const { page, results } = await tmdb.searchMovie('search', 2)
      expect(page).toEqual(2)
      expect(results.length).toEqual(20)
      expect(results[0].id).toEqual(20)
    })

    it('should return an empty results on page 3', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: searchMovieResultMock('search', 3, 20, 40) })
      const { page, results } = await tmdb.searchMovie('search', 3)
      expect(page).toEqual(3)
      expect(results.length).toEqual(0)
    })

    it('should return a limited set of results if total is less than page size', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: searchMovieResultMock('search', 1, 20, 10) })
      const { page, results } = await tmdb.searchMovie('search', 1)
      expect(page).toEqual(1)
      expect(results.length).toEqual(10)
    })

    it('should reject with the error', async () => {
      const error = { status_code: 500, status_message: 'Test error.', success: false }
      mockedAxios.get.mockRejectedValueOnce(error)
      await expect(tmdb.searchMovie('search', 1)).rejects.toEqual(error)
    })

    it('should return page 1 as default', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: searchMovieResultMock('search', 1, 20, 10) })
      const { page } = await tmdb.searchMovie('search')
      expect(page).toEqual(1)
    })
  })

  describe('getConfiguration', () => {
    it ('should return the configuration', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: getConfigurationMock() })
      const result = await tmdb.getConfiguration()
      expect(result).toEqual({ images: { baseUrl: 'http', secureBaseUrl: 'https', posterSizes: ['posters'] } })
    })

    it('should reject with the error', async () => {
      const error = { status_code: 500, status_message: 'Test error.', success: false }
      mockedAxios.get.mockRejectedValueOnce(error)
      await expect(tmdb.getConfiguration()).rejects.toEqual(error)
    })
  })
})
