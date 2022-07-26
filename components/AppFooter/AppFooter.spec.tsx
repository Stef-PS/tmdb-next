import { render } from '@testing-library/react'
import AppFooter from './AppFooter'

it('should render AppFooter unchanged', () => {
  const { container } = render(<AppFooter />)
  expect(container).toMatchInlineSnapshot(`
<div>
  <footer
    class="appFooter"
  >
    © 2022 Publicis Sapient
  </footer>
</div>
`)
})
