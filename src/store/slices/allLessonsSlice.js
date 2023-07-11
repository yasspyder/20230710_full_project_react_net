import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getCookie from "../../services/getCookie";
import { LINK_APP } from "../../config";

export const fetchallLessons = createAsyncThunk(
  "lesson/fetchLessonsByCourseId",
  async function (courseId) {
    const response = await fetch(`${LINK_APP}api/get/lessons?id=${courseId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getCookie("api")}`,
      },
    });
    const data = await response.json();

    return data;
  }
);

const allLessonsSlice = createSlice({
  name: "allLessons",
  initialState: {
    lessons: [],
    passLessons: [],
    loading: false,
    error: false,
  },
  extraReducers: {
    [fetchallLessons.pending]: (state) => {
      state.loading = true;
    },
    [fetchallLessons.fulfilled]: (state, action) => {
      state.lessons = action.payload.lessons;
      state.passLessons = action.payload.pass_lessons;
      state.loading = false;
    },
    [fetchallLessons.rejected]: () => {},
  },
});

export default allLessonsSlice.reducer;
