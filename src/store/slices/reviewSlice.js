import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getCookie from "../../services/getCookie";
import axios from "axios";
import { LINK_APP } from "../../config";

export const fetchSendReview = createAsyncThunk(
  "review/fetchSendReview",
  async function (data) {
    const response = await axios.post(LINK_APP + "api/send/review", data, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getCookie("api")}`,
      },
    });
    if (response.data.success) return response.data;
  }
);

export const fetchGetReviews = createAsyncThunk(
  "review/fetchGetReviews",
  async function () {
    const response = await axios.get(LINK_APP + "api/get/reviews");
    if (response.data.success) return response.data;
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    loading: false,
    reviews: [],
    error: null,
  },
  extraReducers: {
    [fetchSendReview.pending]: (state) => {
      state.loading = true;
    },
    [fetchSendReview.fulfilled]: (state, action) => {
      state.reviews = action.payload.reviews;
      state.loading = false;
    },
    [fetchSendReview.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [fetchGetReviews.pending]: (state) => {
      state.loading = true;
    },
    [fetchGetReviews.fulfilled]: (state, action) => {
      state.reviews = action.payload.reviews;
      state.loading = false;
    },
    [fetchGetReviews.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default reviewSlice.reducer;
