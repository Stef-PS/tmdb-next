
export interface SearchMovie {
  id: number,
  posterPath: string,
  overview: string,
  releaseDate: string,
  originalTitle: string,
  originalLanguage: string,
  title: string,
  popularity: number,
  voteCount: number,
  voteAverage: number,
}

export interface SearchMovieResult {
  page: number,
  results: SearchMovie[],
  totalResults: number,
  totalPages: number,
}
