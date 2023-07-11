import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getCookie from "../../services/getCookie";
import axios from "axios";
import { LINK_APP } from "../../config";

export const fetchDictinary = createAsyncThunk(
  "dictionary/fetchDictinary",
  async function () {
    const response = await axios.get(LINK_APP + "api/get/dictionary", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getCookie("api")}`,
      },
    });
    if (response.data.success) return response.data;
  }
);

export const fetchRemoveWord = createAsyncThunk(
  "dictionary/fetchRemoveWord",
  async function (wordId) {
    const response = await axios.get(
      `${LINK_APP}api/remove/word?id=${wordId}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${getCookie("api")}`,
        },
      }
    );
    if (response.data.success) return response.data;
  }
);

export const fetchAddNewWord = createAsyncThunk(
  "dictionary/fetchAddNewWord",
  async function (data) {
    const response = await axios.post(LINK_APP + "api/add/word", data, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getCookie("api")}`,
      },
    });
    if (response.data) return response.data;
  }
);

const dictionarySlice = createSlice({
  name: "dictionary",
  initialState: {
    loading: false,
    dictionary: [],
    error: null,
  },
  extraReducers: {
    [fetchDictinary.pending]: (state) => {
      state.loading = true;
    },
    [fetchDictinary.fulfilled]: (state, action) => {
      state.dictionary = action.payload.words;
      state.loading = false;
    },
    [fetchDictinary.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [fetchRemoveWord.pending]: (state) => {
      state.loading = true;
    },
    [fetchRemoveWord.fulfilled]: (state, action) => {
      state.dictionary = action.payload.words;
      state.loading = false;
    },
    [fetchRemoveWord.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [fetchAddNewWord.pending]: (state) => {
      state.loading = true;
    },
    [fetchAddNewWord.fulfilled]: (state, action) => {
      if (!action.payload.success) {
        state.error = action.payload.errors;
        state.loading = false;
        return;
      }
      state.dictionary = action.payload.words;
      state.loading = false;
    },
    [fetchAddNewWord.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default dictionarySlice.reducer;
