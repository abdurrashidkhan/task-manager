import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks, addTask } from "./action";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    removeTask: (state, action) => {
      state.list = state.list.filter((task) => task.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add Task
      
      .addCase(addTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        console.log('Task added:', action.payload);
        state.loading = false;
        state.tasks = {task:action.payload.data}; 
        state.error = null;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      //update task status
  },
});

export const { removeTask } = taskSlice.actions;
export default taskSlice.reducer;
