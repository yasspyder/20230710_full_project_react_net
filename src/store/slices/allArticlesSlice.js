import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LINK_APP } from "../../config";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async function () {
    const response = await axios.get(LINK_APP + "api/get/articles");
    if (response.data.success) return response.data.articles;
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    loading: false,
    articles: [],
    error: null,
  },
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.loading = true;
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.articles = action.payload;
      state.loading = false;
    },
    [fetchArticles.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default articlesSlice.reducer;
