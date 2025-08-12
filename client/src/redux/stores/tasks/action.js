import { createAsyncThunk } from "@reduxjs/toolkit";
import { createTaskAPI } from "./api";

// used thunk
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const data = await createApi(taskData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
