import { useRouter } from 'next/router';
import styles from './SearchBar.module.css'

const SearchBar = () => {
  const router = useRouter()
  const search = (query: string): void => {
    router.push(`/?q=${query}`)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    search(e.target.value)
  }
  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') search(e.target.value)
  }

  return (
    <section className={styles.searchBar}>
      <input type="text" placeholder="Search for a movie..." onBlur={handleBlur} onKeyDown={handleEnterKey} />
      <button>Search</button>
    </section>
  )
}

export default SearchBar
