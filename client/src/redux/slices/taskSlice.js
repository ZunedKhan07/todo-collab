import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// 🔹 Fetch all tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const res = await axios.get("/tasks");
  return res.data.tasks;
});

// 🔹 Create a new task
export const createTask = createAsyncThunk("tasks/createTask", async (taskData) => {
  const res = await axios.post("/tasks", taskData, { withCredentials: true });
  return res.data.task;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔸 FETCH
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
      })

      // 🔸 CREATE
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks = [...(state.tasks || []), action.payload];
      });

  },
});

export default taskSlice.reducer;
