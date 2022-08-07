import type { GetServerSideProps, NextPage } from 'next'
import AppHeader from '../components/AppHeader/AppHeader'
import AppFooter from '../components/AppFooter/AppFooter'
import SearchBar from '../components/SearchBar/SearchBar'
import MovieCard from '../components/MovieCard/MovieCard'
import tmdb, { SearchMovie, SearchMovieResult } from '../logic/datasources/TmdbDatasource'

interface HomeProps {
  search: string,
  movies: SearchMovie[],
}

const Home: NextPage<HomeProps> = (props: HomeProps) => {
  return (
    <>
      <AppHeader />
      <main>
        <SearchBar search={props.search}/>
        {props.movies.map((movie: SearchMovie) => <MovieCard key={movie.id} movie={movie} />)}
      </main>
      <AppFooter />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { q } = context.query
  const search = Array.isArray(q) ? q[0] : q

  if (!search) return { props: { search: '', movies: [] } }

  const { results: movies } = await tmdb.searchMovie(search) as SearchMovieResult

  return { props: { search, movies } }
}

export default Home
