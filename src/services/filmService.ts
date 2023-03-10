import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IFilm, IFilms } from '../hooks/models/IModel';

interface IParams {
  searchName: string;
  page: number;
}

const API_KEY: string = 'a0f09bc4';

export const filmAPI = createApi({
  reducerPath: 'filmAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.omdbapi.com/' }),
  endpoints: builder => ({
    getFilmsByTitle: builder.query<IFilms, IParams>({
      query: ({ searchName, page }) => ({
        url: '',
        params: {
          apikey: API_KEY,
          s: searchName,
          type: 'movie',
          page,
        },
      }),
    }),

    getFilmById: builder.query({
      query: (id: string | undefined | string[]) => ({
        url: '',
        params: {
          apikey: API_KEY,
          i: id,
        },
      }),
    }),
  }),
});
