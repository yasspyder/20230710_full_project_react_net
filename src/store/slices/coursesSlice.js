import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LINK_APP } from "../../config";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async function () {
    const response = await fetch(LINK_APP + "api/get/courses");
    const data = await response.json();

    return data.courses;
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    loading: false,
    error: false,
  },
  extraReducers: {
    [fetchCourses.pending]: (state) => {
      state.loading = true;
    },
    [fetchCourses.fulfilled]: (state, action) => {
      state.courses = action.payload;
      state.loading = false;
    },
    [fetchCourses.rejected]: () => {},
  },
});

export default coursesSlice.reducer;
