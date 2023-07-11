import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LINK_APP } from "../../config";

export const fetchTest = createAsyncThunk(
  "test/fetchTest",
  async function (testId) {
    const response = await axios.get(`${LINK_APP}api/get/test?id=${testId}`);
    if (response.data.success) return response.data;
  }
);

const testSlice = createSlice({
  name: "test",
  initialState: {
    loading: false,
    test: null,
    error: null,
  },
  extraReducers: {
    [fetchTest.pending]: (state) => {
      state.loading = true;
    },
    [fetchTest.fulfilled]: (state, action) => {
      state.test = action.payload;
      state.loading = false;
    },
    [fetchTest.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default testSlice.reducer;
