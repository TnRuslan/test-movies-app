import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilm } from '../hooks/models/IModel';

interface filmState {
  films: IFilm[];
  searchName: string;
  favoriteFilams: IFilm[];
}

const initialState: filmState = {
  films: [],
  searchName: '',
  favoriteFilams: [],
};
export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setSearchName(state, action: PayloadAction<string>) {
      state.searchName = action.payload;
    },
    addFavoriteFilm(state, action: PayloadAction<IFilm>) {
      state.favoriteFilams.push(action.payload);
    },
    removeFromFavorite(state, action: PayloadAction<string>) {
      const index = state.favoriteFilams.findIndex(
        film => film.imdbID === action.payload
      );
      if (index === -1) {
        return;
      }
      state.favoriteFilams.splice(index, 1);
    },
  },
});

export const filmsReducer = filmsSlice.reducer;
export const setSearchName = filmsSlice.actions;
