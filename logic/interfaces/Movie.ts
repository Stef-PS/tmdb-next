export interface BelongsToCollection {
  id: number
  name: string
  posterPath: string
  backdropPath: string
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  logoPath: string
  name: string
  originCountry: string
}

export interface ProductionCountry {
  iso3166_1: string
  name: string
}

export interface SpokenLanguage {
  englishName: string
  iso639_1: string
  name: string
}

export interface Movie {
  adult: boolean,
  backdropPath: string,
  belongsToCollection: BelongsToCollection,
  budget: number,
  genres: Genre[],
  homepage: string,
  id: number,
  imdbId: string,
  originalLanguage: string,
  originalTitle: string,
  overview: string,
  popularity: number,
  posterPath: string,
  productionCompanies: ProductionCompany[],
  productionCountries: ProductionCountry[],
  releaseDate: string,
  revenue: number,
  runtime: number,
  spokenLanguages: SpokenLanguage[],
  status: string,
  tagline: string,
  title: string,
  video: boolean,
  voteAverage: number,
  voteCount: number
}
