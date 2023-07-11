import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getCookie from "../../services/getCookie";
import axios from "axios";
import { LINK_APP } from "../../config";
import { showModal } from "./modalSlice";

export const login = createAsyncThunk(
  "profile/login",
  async function (authData) {
    await axios.get("https://breakhd2.store/sanctum/csrf-cookie");
    const response = await axios.post(LINK_APP + "api/auth/login", authData);
    if (response.data.success) {
      document.cookie = `api=${response.data.data.token}; path=/`;
    }
    return response.data;
  }
);

export const register = createAsyncThunk(
  "profile/register",
  async function (authData) {
    await axios.get("https://breakhd2.store/sanctum/csrf-cookie");

    const response = await axios.post(LINK_APP + "api/auth/register", authData);

    if (response.data.success) {
      document.cookie = `api=${response.data.data.token}; path=/`;
    }

    return response.data;
  }
);

export const confirmLogin = createAsyncThunk(
  "profile/confirmLogin",
  async function () {
    const response = await fetch(LINK_APP + "api/get/user", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getCookie("api")}`,
      },
    });

    const data = await response.json();

    return data;
  }
);

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async function () {
    const response = await fetch(LINK_APP + "api/get/profile", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getCookie("api")}`,
      },
    });

    const data = await response.json();

    return data;
  }
);

export const editProfile = createAsyncThunk(
  "profile/editProfile",
  async function (userData) {
    const response = await axios.post(LINK_APP + "api/edit/profile", userData, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getCookie("api")}`,
      },
    });

    return response.data;
  }
);

export const buyAvatar = createAsyncThunk(
  "profile/buyAvatar",
  async function (id) {
    const response = await axios.get(`${LINK_APP}api/buy/avatar?id=${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getCookie("api")}`,
      },
    });

    if (response.data.success) return response.data;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    token: null,
    profile: null,
    profilePageData: null,
    avatars: null,
    userAvatarsId: null,
    loading: false,
    error: null,
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      if (!action.payload.success) {
        state.error = action.payload.errors;
        state.loading = false;
        return;
      }
      state.token = action.payload.data.token;
      state.profile = action.payload.data.profile;
      state.loading = false;
    },
    [login.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      if (!action.payload.success) {
        state.error = action.payload.errors;
        state.loading = false;
        return;
      }
      state.token = action.payload.data.token;
      state.profile = action.payload.data.profile;
      state.loading = false;
    },
    [register.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [confirmLogin.pending]: (state) => {
      state.loading = true;
    },
    [confirmLogin.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.profile = action.payload.profile;
      state.loading = false;
    },
    [confirmLogin.rejected]: (state, action) => {
      state.token = null;
      state.profile = null;
      state.error = action.payload;
    },
    [getProfile.pending]: (state) => {
      state.loading = true;
    },
    [getProfile.fulfilled]: (state, action) => {
      state.profilePageData = action.payload.profile;
      state.avatars = action.payload.avatars;
      state.userAvatarsId = action.payload.user_avatars;
      state.loading = false;
    },
    [editProfile.pending]: (state) => {
      state.loading = true;
    },
    [editProfile.fulfilled]: (state, action) => {
      if (!action.payload.success) {
        state.error = action.payload.errors;
        state.loading = false;
        return;
      }
      state.profilePageData = action.payload.profile;
      state.loading = false;
      state.error = null;
    },
    [buyAvatar.pending]: (state) => {
      state.loading = true;
    },
    [buyAvatar.fulfilled]: (state, action) => {
      state.loading = false;
      state.profilePageData = action.payload.profile;
      state.userAvatarsId = action.payload.user_avatars;
    },
  },
});

export default profileSlice.reducer;
