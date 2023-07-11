import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LINK_APP } from "../../config";

export const fetchLesson = createAsyncThunk(
  "lesson/fetchLessonById",
  async function (lessonId) {
    const response = await fetch(`${LINK_APP}api/get/lesson?id=${lessonId}`);
    const data = await response.json();

    return data;
  }
);

const lessonSlice = createSlice({
  name: "lesson",
  initialState: {
    lesson: null,
    loading: false,
    error: false,
  },
  extraReducers: {
    [fetchLesson.pending]: (state) => {
      state.loading = true;
    },
    [fetchLesson.fulfilled]: (state, action) => {
      state.lesson = action.payload;
      state.loading = false;
    },
    [fetchLesson.rejected]: () => {},
  },
});

export default lessonSlice.reducer;
