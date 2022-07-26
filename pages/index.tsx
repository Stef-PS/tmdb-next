import type { NextPage } from 'next'
import AppHeader from '../components/AppHeader/AppHeader'
import AppFooter from '../components/AppFooter/AppFooter'

const Home: NextPage = () => {
  return (
    <>
      <AppHeader />
      <main>
        <button>OK</button>
      </main>
      <AppFooter />
    </>
  )
}

export default Home
