export interface IFilms {
  Response: boolean;
  Search: Array<IFilm>;
  totalResults: number | null;
}

export interface IFilm {
  imdbID: number;
  Title: string;
  Poster: string;
  Type: string;
  Year: number;
}
