import { render } from '@testing-library/react'
import { Configuration, SearchMovie } from '../../logic/datasources/TmdbDatasource'
import MovieCard from './MovieCard'

const movie: SearchMovie = {
  id: 1,
  title: 'title',
  releaseDate: '2009-09-20',
  voteAverage: 10,
  posterPath: '/poster_path.jpg',
  overview: 'this is a test movie.',
  originalTitle: 'original title',
  originalLanguage: 'original language',
  popularity: 1,
  voteCount: 2,
}

const config: Configuration = {
  images: {
    secureBaseUrl: 'https://image.tmdb.org/t/p/',
    baseUrl: 'https://image.tmdb.org/t/p/',
    posterSizes: ['w342']
  }
}

describe('MovieCard', () => {
  it('should render MovieCard unchanged', () => {
    const { container } = render(<MovieCard movie={movie} config={config} />)
    expect(container).toMatchSnapshot()
  })
})

