import { render, fireEvent } from '@testing-library/react'
import SearchBar from './SearchBar'

const push = jest.fn()

jest.mock('next/router', ()=> ({
  useRouter: () => ({ push })
}))

describe('SearchBar', () => {
  it('should render SearchBar unchanged', () => {
    const { container } = render(<SearchBar search="" />)
    expect(container).toMatchInlineSnapshot(`
<div>
  <section
    class="searchBar"
  >
    <input
      placeholder="Search for a movie..."
      type="text"
      value=""
    />
    <button>
      Search
    </button>
  </section>
</div>
`)
  })

  it('should route to / when the search button is clicked with empty input', () => {
    const { getByText } = render(<SearchBar search="" />)
    const searchButton = getByText('Search')
    searchButton.click()
    expect(push).toHaveBeenCalledWith('/')
  })

  it('should route to /?q=search when search button is clicked with non-empty input', () => {
    const { getByText, getByPlaceholderText } = render(<SearchBar search="searchOnClick" />)
    const searchButton = getByText('Search') as HTMLButtonElement
    const input = getByPlaceholderText('Search for a movie...') as HTMLInputElement
    searchButton.click()
    expect(push).toHaveBeenCalledWith('/?q=searchOnClick')
  })

  it('should route when input losts focus', () => {
    const { getByPlaceholderText } = render(<SearchBar search="searchOnBlur" />)
    const input = getByPlaceholderText('Search for a movie...') as HTMLInputElement
    input.focus()
    input.blur()
    expect(push).toHaveBeenCalledWith('/?q=searchOnBlur')
  })

  it('should route when Enter key is pressed on input', () => {
    const { getByPlaceholderText } = render(<SearchBar search="searchOnEnter" />)
    const input = getByPlaceholderText('Search for a movie...') as HTMLInputElement
    fireEvent.keyDown(input, {key: 'Enter'})
    expect(push).toHaveBeenCalledWith('/?q=searchOnEnter')
  })

  it('should route when Enter key is pressed on input with empty value', () => {
    const { getByPlaceholderText } = render(<SearchBar search="" />)
    const input = getByPlaceholderText('Search for a movie...') as HTMLInputElement
    input.focus()
    fireEvent.keyDown(input, {key: 'Enter'})
    expect(push).toHaveBeenCalledWith('/')
  })

  it('should call setValue when value typed in input', () => {
    const { getByPlaceholderText } = render(<SearchBar />)
    const input = getByPlaceholderText('Search for a movie...') as HTMLInputElement
    input.focus()
    fireEvent.change(input, { target: { value: 'searchOnChange' } })
    expect(input.value).toBe('searchOnChange')
  })
})
