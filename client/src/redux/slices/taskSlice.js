import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const res = await axios.get("/tasks");
  return res.data;
});

export const updateTaskStatus = createAsyncThunk(
  "tasks/updateTaskStatus",
  async ({ id, status }) => {
    const res = await axios.put(`/tasks/${id}`, { status });
    return res.data;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch tasks";
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        state.tasks = state.tasks.map((task) =>
          task._id === updated._id ? updated : task
        );
      });
  },
});

export default taskSlice.reducer;
