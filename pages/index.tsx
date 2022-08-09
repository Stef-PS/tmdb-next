import type { GetServerSideProps, NextPage } from 'next'
import AppHeader from '../components/AppHeader/AppHeader'
import AppFooter from '../components/AppFooter/AppFooter'
import SearchBar from '../components/SearchBar/SearchBar'
import MovieCard from '../components/MovieCard/MovieCard'
import tmdb, { Configuration, SearchMovie } from '../logic/datasources/TmdbDatasource'

interface HomeProps {
  search: string,
  movies: SearchMovie[],
  config: Configuration
}

const Home: NextPage<HomeProps> = ({ search, movies, config }: HomeProps) => {
  return (
    <>
      <AppHeader />
      <main>
        <SearchBar search={search}/>
        {movies.map((movie: SearchMovie) => <MovieCard key={movie.id} movie={movie} config={config} />)}
      </main>
      <AppFooter />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { q } = context.query
  const search = Array.isArray(q) ? q[0] : q

  if (!search) return { props: { search: '', movies: [] } }

  const [searchMovies, config] = await Promise.all([
    tmdb.searchMovie(search),
    tmdb.getConfiguration()
  ])

  return { props: { search, movies: searchMovies.results, config } }
}

export default Home
