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
  },
});

export const filmsReducer = filmsSlice.reducer;
export const setSearchName = filmsSlice.actions;
