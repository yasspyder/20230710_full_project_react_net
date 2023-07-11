import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LINK_APP } from "../../config";

export const sendNotification = createAsyncThunk(
  "notification/subscribe",
  async function (email) {
    const response = await fetch(`${LINK_APP}api/send/mail?email=${email}`);
    const data = await response.json();
    return data;
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    loading: false,
    message: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: {
    [sendNotification.pending]: (state) => {
      state.message = null;
      state.loading = true;
    },
    [sendNotification.fulfilled]: (state, action) => {
      if (!action.payload.success) {
        state.message = action.payload.errors;
        state.loading = false;
        return;
      }
      state.message = action.payload.message;
      state.loading = false;
    },
  },
});

export const { clearMessage } = notificationSlice.actions;

export default notificationSlice.reducer;
