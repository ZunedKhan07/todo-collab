import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// ✅ Check login
export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const res = await axios.get("/auth/me");
  return res.data;
});

// ✅ Login
export const loginUser = createAsyncThunk("auth/login", async (credentials) => {
  const res = await axios.post("/auth/login", credentials);
  return res.data;
});

// ✅ Register
export const registerUser = createAsyncThunk("auth/register", async (userData) => {
  const res = await axios.post("/auth/register", userData);
  return res.data;
});

// ✅ Logout
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await axios.post("/auth/logout");
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Check Auth
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

      // Login
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

      // Register
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

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
