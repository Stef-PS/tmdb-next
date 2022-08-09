import { render } from '@testing-library/react'
import Rating from './Rating'

describe('Rating', () => {
  it('should render Rating unchanged', () => {
    const { container } = render(<Rating rate={3} />)
    expect(container).toMatchSnapshot()
  })

  it('should display the right number of filled stars', () => {
    for (let i = 0; i <= 10; i++) {
      const { container } = render(<Rating rate={i} />)
      const filledStars = container.getElementsByClassName('star')?.length ?? 0
      expect(filledStars).toBe(Math.round(i / 2))
    }
  })
})

