import type { GetServerSideProps, NextPage } from 'next'
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
        <SearchBar search={props.search}/>
      </main>
      <AppFooter />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { q, page } = context.query
  if (!q) return { props: { search: '' } }
  return { props: { search: q, page: page ?? 1 } }
}

export default Home
