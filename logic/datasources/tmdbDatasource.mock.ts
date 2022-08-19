export const searchMovieResultMock = (query: string, page: number, pageSize: number, total: number) => {
  const results = []
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

export const getConfigurationMock = () => {
  return {
    images: {
      base_url: 'http://image.tmdb.org',
      secure_base_url: 'https://image.tmdb.org',
      poster_sizes: ['w500']
    }
  }
}

export const getMovieMock = (id: number) => ({
  adult: false,
  backdrop_path: `backdrop_path_${id}`,
  belongs_to_collection: {
    id: id,
    name: `name_${id}`,
    poster_path: `poster_path_${id}`,
    backdrop_path: `backdrop_path_${id}`
  },
  budget: id,
  genres: [{ id: id, name: `name_${id}` }],
  homepage: `homepage_${id}`,
  id: id,
  imdb_id: `imdb_id_${id}`,
  original_language: 'original_language',
  original_title: `original_title_${id}`,
  overview: `overview_${id}`,
  popularity: id,
  poster_path: `poster_path_${id}`,
  production_companies: [{ id: id, logo_path: `logo_path_${id}`, name: `name_${id}`, origin_country: `origin_country_${id}` }],
  production_countries: [{ iso_3166_1: `iso_3166_1_${id}`, name: `name_${id}` }],
  release_date: 'release_date',
  revenue: id,
  runtime: id,
  spoken_languages: [{ english_name: `english_name_${id}`, iso_639_1: `iso_639_1_${id}`, name: `name_${id}` }],
  status: 'status',
  tagline: `tagline_${id}`,
  title: `title_${id}`,
  video: false,
  vote_average: id,
  vote_count: id
})
