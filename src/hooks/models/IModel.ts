export interface IFilms {
  Response: string;
  Search: Array<IFilm>;
  totalResults: number | null;
  Error: string;
}

export interface IFilm {
  imdbID: string;
  Title: string;
  Poster: string;
  Type: string;
  Year: number;
}
