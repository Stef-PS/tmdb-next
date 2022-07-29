import type { NextPage } from 'next'
import AppHeader from '../components/AppHeader/AppHeader'
import AppFooter from '../components/AppFooter/AppFooter'
import SearchBar from '../components/SearchBar/SearchBar'

interface HomeProps {
  search: string
}

const Home: NextPage<HomeProps> = (props: HomeProps) => {
  return (
    <>
      <AppHeader />
      <main>
        <SearchBar />
      </main>
      <AppFooter />
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: { search: 'my search' },
  }
}

export default Home
