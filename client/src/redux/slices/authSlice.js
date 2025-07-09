import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const res = await axios.get("/auth/me");
  return res.data;
});

export const loginUser = createAsyncThunk("auth/login", async (credentials) => {
  const res = await axios.post("/auth/login", credentials);
  return res.data;
});

export const registerUser = createAsyncThunk("auth/register", async (userData) => {
  const res = await axios.post("/auth/register", userData);
  return res.data;
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await axios.post("/auth/logout");
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    socket: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.socket = null;
      });
  },
});

export const { setUser, setSocket } = authSlice.actions;
export default authSlice.reducer;
