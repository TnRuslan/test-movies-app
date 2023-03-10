import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://www.omdbapi.com";

export const findFilmsByTitle = createAsyncThunk(
  "film/search",
  async (searchParams, thunkAPI) => {
    try {
      const response = await axios.get(`/?s=${searchParams}&apikey=a0f09bc4`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
