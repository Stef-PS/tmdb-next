import { render } from '@testing-library/react'
import { Configuration, SearchMovie } from '../../logic/datasources/TmdbDatasource'
import '@testing-library/jest-dom'
import MovieList from './MovieList'

const movies = [
  { title: 'movie title 1', id: 1, releaseDate: '2001-01-01', voteAverage: 2, posterPath: 'posterPath1' },
  { title: 'movie title 2', id: 2, releaseDate: '2002-01-01', voteAverage: 4, posterPath: 'posterPath2' },
  { title: 'movie title 3', id: 3, releaseDate: '2003-01-01', voteAverage: 6, posterPath: 'posterPath3' },
] as SearchMovie[]

const config = {
  images: {
    baseUrl: 'https://image.tmdb.org/t/p/',
    secureBaseUrl: 'https://image.tmdb.org/t/p/',
    posterSizes: ['w500']
  }
} as Configuration


describe('Movie List', () => {
  it('should render all titles', () => {
    const { getByText } = render(<MovieList movies={movies} config={config} />)
    movies.forEach(movie => {
      expect(getByText(movie.title)).toBeInTheDocument()
    })
  })

  it('should render a list of images', () => {
    const { getByAltText } = render(<MovieList movies={movies} config={config} />)
    movies.forEach(movie => {
      expect(getByAltText(movie.title)).toBeInTheDocument()
    })
  })

  it('should render the right number of stars', () => {
    const { container } = render(<MovieList movies={movies} config={config} />)
    expect(container.querySelectorAll('.star')?.length).toEqual(6)
  })

  it('should render a list of release years', () => {
    const { getByText } = render(<MovieList movies={movies} config={config} />)
    movies.forEach(movie => {
      expect(getByText(movie.releaseDate.substring(0,4))).toBeInTheDocument()
    })
  })

  it('should render an empty list', () => {
    const { container } = render(<MovieList movies={[]} config={config} />)
    expect(container.querySelectorAll('li')?.length).toEqual(0)
  })

  it('should render the right number of li tags', () => {
    const { container } = render(<MovieList movies={movies} config={config} />)
    expect(container.querySelectorAll('li')?.length).toEqual(3)
  })

  it('should render the movie list unchanged', () => {
    const { container } = render(<MovieList movies={movies} config={config} />)
    expect(container.innerHTML).toMatchSnapshot()
  })
})
