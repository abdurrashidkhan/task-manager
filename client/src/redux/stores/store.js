import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasks/reducer";
import baseApi from "../stores/api/tasksBaseApi";

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
