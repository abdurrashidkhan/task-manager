//  action creators 
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTasksApi, addTaskApi, updateTaskApi } from "./api";

//  Task Load Action
export const fetchTasks = createAsyncThunk("/tasks", async () => {
  const data = await fetchTasksApi();
  return data;
});

// Task Add Action
export const addTask = createAsyncThunk("/create-task", async (task) => {
  const data = await addTaskApi(task);
  return data;
});
// Task Add Action
export const updateTaskStatus = createAsyncThunk("/update-task/", async (task) => {
  const data = await updateTaskApi(task);
  return data;
});

