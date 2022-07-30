import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import styles from './SearchBar.module.css'

interface SearchBarProps {
  search?: string
}

const SearchBar = (props: SearchBarProps) => {
  const router = useRouter()
  const input = useRef(null)
  const [value, setValue] = useState(props.search ?? '')

  const search = (): void => {
    router.push(value ? `/?q=${value}` : '/')
  }

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      search()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
  }

  return (
    <section className={styles.searchBar}>
      <input ref={input} type="text" placeholder="Search for a movie..." value={value} onChange={handleChange} onBlur={search} onKeyDown={handleEnterKey} />
      <button onClick={search}>Search</button>
    </section>
  )
}

export default SearchBar
