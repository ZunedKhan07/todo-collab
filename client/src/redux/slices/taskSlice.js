import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Get all tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();

      const res = await axios.get("/api/v1/tasks", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      // ✅ Return only if it's an array
      if (Array.isArray(res.data)) {
        return res.data;
      } else {
        return rejectWithValue("Invalid task data format received.");
      }
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Failed to fetch tasks");
    }
  }
);

// ✅ Slice
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [], // ✅ Must always stay as an array
    loading: false,
    error: null,
  },
  reducers: {
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    updateTask(state, action) {
      const index = state.tasks.findIndex((t) => t._id === action.payload._id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((t) => t._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ Defensive check again
        state.tasks = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
