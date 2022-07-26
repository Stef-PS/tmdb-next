import { render } from '@testing-library/react'
import AppHeader from './AppHeader'

it('should render AppHeader unchanged', () => {
  const { container } = render(<AppHeader />)
  expect(container).toMatchInlineSnapshot(`
<div>
  <header
    class="appHeader"
  >
    <h1>
      The Movie Database
    </h1>
    <p>
      As a Next application
    </p>
  </header>
</div>
`)
})
