import { transformSearchMovie, transformMovie } from "./MovieUtils"

describe('Movie Utils', () => {
  it("should transform SearchMovie", () => {
    const movie = {
      id: 1,
      overview: "overview",
      release_date: "releaseDate",
      original_title: "originalTitle",
      original_language: "originalLanguage",
      title: "title",
      popularity: 1,
      poster_path: "posterPath",
      vote_count: 1,
      vote_average: 1,
    }
    const expected = {
      id: 1,
      posterPath: "posterPath",
      overview: "overview",
      releaseDate: "releaseDate",
      originalTitle: "originalTitle",
      originalLanguage: "originalLanguage",
      title: "title",
      popularity: 1,
      voteCount: 1,
      voteAverage: 1,
    }
    expect(transformSearchMovie(movie)).toEqual(expected)
  })

  it("should transform Movie", () => {
    const movie = {
      adult: false,
      backdrop_path: "backdropPath",
      belongs_to_collection: {
        id: 1,
        name: "name",
        poster_path: "posterPath",
        backdrop_path: "backdropPath",
      },
      budget: 1,
      genres: [{ id: 1, name: "name" }],
      homepage: "homepage",
      id: 1,
      imdb_id: "imdbId",
      original_language: "originalLanguage",
      original_title: "originalTitle",
      overview: "overview",
      popularity: 1,
      poster_path: "posterPath",
      production_companies: [{ id: 1, logo_path: "logoPath", name: "name", origin_country: "originCountry" }],
      production_countries: [{ iso_3166_1: "iso3166_1", name: "name" }],
      release_date: "releaseDate",
      revenue: 1,
      runtime: 1,
      spoken_languages: [{ english_name: "englishName", iso_639_1: "iso639_1", name: "name" }],
      status: "status",
      tagline: "tagline",
      title: "title",
      video: false,
      vote_average: 1,
      vote_count: 1,
    }
    const expected = {
      adult: false,
      backdropPath: "backdropPath",
      belongsToCollection: {
        id: 1,
        name: "name",
        posterPath: "posterPath",
        backdropPath: "backdropPath",
      },
      budget: 1,
      genres: [{ id: 1, name: "name" }],
      homepage: "homepage",
      id: 1,
      imdbId: "imdbId",
      originalLanguage: "originalLanguage",
      originalTitle: "originalTitle",
      overview: "overview",
      popularity: 1,
      posterPath: "posterPath",
      productionCompanies: [
        { id: 1, logoPath: "logoPath", name: "name", originCountry: "originCountry" }
      ],
      productionCountries: [{ iso3166_1: "iso3166_1", name: "name" }],
      releaseDate: "releaseDate",
      revenue: 1,
      runtime: 1,
      spokenLanguages: [{ englishName: "englishName", iso639_1: "iso639_1", name: "name" }],
      status: "status",
      tagline: "tagline",
      title: "title",
      video: false,
      voteAverage: 1,
      voteCount: 1
    }
    expect(transformMovie(movie)).toEqual(expected)
  })
})
