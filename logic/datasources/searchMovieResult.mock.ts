import { SearchMovie, SearchMovieResult } from './TmdbDatasource'

export const searchMovieResultMock = (query: string, page: number, pageSize: number, total: number): SearchMovieResult => {
  const results: SearchMovie[] = []
  for (let i = pageSize * (page - 1); i < Math.min(pageSize * page, total); i++) {
    results.push({
      id: i,
      poster_path: `poster_path_${i}`,
      adult: false,
      overview: `overview_${i}`,
      release_date: 'release_date',
      genre_ids: [1, 2],
      original_title: `original_title_${i}`,
      original_language: 'original_language',
      title: `title_${query}_${i}`,
      backdrop_path: `backdrop_path_${i}`,
      popularity: 1,
      vote_count: 1,
      video: false,
      vote_average: 1,
    })
  }
  return {
    page: page,
    results,
    total_results: total,
    total_pages: page,
  }
}
