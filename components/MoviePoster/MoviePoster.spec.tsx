import { render } from '@testing-library/react'
import MoviePoster from './MoviePoster'
import '@testing-library/jest-dom'

const validImageUrl = 'https://via.placeholder.com/300/00FF00/000000?text=valid'
const fallbackImageUrl = 'https://via.placeholder.com/300/FF0000/FFFFFF?text=fallback'

describe('MoviePoster', () => {
  it('should render as usual', () => {
    const { container } = render(<MoviePoster imageUrl={validImageUrl} fallbackUrl={fallbackImageUrl} alt="movie poster" />)
    expect(container).toMatchSnapshot()
  })

  it('should render an img tag with the right src', () => {
    const { getByAltText } = render(<MoviePoster imageUrl={validImageUrl} fallbackUrl={fallbackImageUrl} alt="movie poster" />)
    const img = getByAltText('movie poster')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', validImageUrl)
  })

  it('should render an img tag with the fallback src', () => {
    const { getByAltText } = render(<MoviePoster imageUrl={validImageUrl} fallbackUrl={fallbackImageUrl} alt="movie poster" testError={true} />)
    const img = getByAltText('movie poster')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', fallbackImageUrl)
  })
})
