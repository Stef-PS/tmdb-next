import axios from 'axios'
import tmdb, { TmdbDatasource, tmdbDatasourceFactory } from './TmdbDatasource'
import { getConfigurationMock, searchMovieResultMock } from './tmdbDatasource.mock'

jest.mock('axios', () => ({
  get: jest.fn()
}))
const mockedAxios = axios as jest.Mocked<typeof axios>
mockedAxios.get.mockResolvedValueOnce({ data: getConfigurationMock() })
tmdb.getConfiguration();

describe('Tmdb Client', () => {
  describe('tmdbDatasource', () => {
    it('should generate a singleton', () => {
      const tmdb1 = new TmdbDatasource()
      const tmdb2 = tmdbDatasourceFactory()
      expect(tmdb1).not.toBe(tmdb2)
      expect(tmdb2).toBe(tmdb)
    })

    it('should have the configuration already loaded', async () => {
      jest.clearAllMocks()
      const config = await tmdb.getConfiguration()
      expect(mockedAxios.get).toHaveBeenCalledTimes(0)
    })
  })

  describe('searchMovie', () => {
    it('should perform a movie search with the right parameters', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: searchMovieResultMock('search', 3, 20, 40) })
      await tmdb.searchMovie('search', 1)
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/search/movie?api_key=test&query=search&page=1&language=en-US&include_adult=false',
        { timeout: 2500, headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }
      )
    })

    it('should return a valid movie search', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: searchMovieResultMock('search', 1, 20, 40) })
      const { results } = await tmdb.searchMovie('search', 1)
      expect(results.length).toEqual(20)
      expect(results[0].title).toEqual('title_search_0')
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

    it('should return an empty poster path if poster_path is not defined on source', async () => {
      const searchResults = searchMovieResultMock('search', 1, 20, 1)
      searchResults.results[0].poster_path = ''
      mockedAxios.get.mockResolvedValueOnce({ data: searchResults })
      const { results } = await tmdb.searchMovie('search', 1)
      expect(results[0].posterPath).toEqual('')
    })
  })

  describe('getConfiguration', () => {
    it ('should return the configuration', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: getConfigurationMock() })
      const result = await tmdb.getConfiguration()
      expect(result).toMatchInlineSnapshot(`
Object {
  "images": Object {
    "baseUrl": "http://image.tmdb.org",
    "posterSizes": Array [
      "w500",
    ],
    "secureBaseUrl": "https://image.tmdb.org",
  },
}
`)
    })

    it('should cache the configuration', async () => {
      mockedAxios.get.mockClear()
      mockedAxios.get.mockResolvedValueOnce({ data: getConfigurationMock() })
      const tmdbInstance = new TmdbDatasource()
      const config1 = await tmdbInstance.getConfiguration()
      const config2 = await tmdbInstance.getConfiguration()
      expect(mockedAxios.get).toHaveBeenCalledTimes(1)
      expect(config1).toEqual(config2)
    })

    it('should reject with the error', async () => {
      const tmdbInstance = new TmdbDatasource()
      const error = { status_code: 500, status_message: 'Test error.', success: false }
      mockedAxios.get.mockReset()
      mockedAxios.get.mockRejectedValueOnce(error)
      await expect(tmdbInstance.getConfiguration()).rejects.toEqual(error)
    })

    it('should refetch the config when removed', async () => {
      jest.clearAllMocks()
      tmdb.resetConfiguration()
      mockedAxios.get.mockResolvedValueOnce({ data: getConfigurationMock() })
      tmdb.getConfiguration()
      expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    })
  })
})
