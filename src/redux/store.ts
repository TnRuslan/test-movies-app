import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { filmAPI } from '../services/filmService';
import { filmsReducer } from './filmSlice';

const rootReducer = combineReducers({
  filmsReducer,
  [filmAPI.reducerPath]: filmAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(filmAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
