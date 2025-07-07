import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchLogs = createAsyncThunk("logs/fetchLogs", async () => {
  const res = await axios.get("/logs");
  return res.data.logs;
});

const logSlice = createSlice({
  name: "logs",
  initialState: {
    logs: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload;
      })
      .addCase(fetchLogs.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default logSlice.reducer;
