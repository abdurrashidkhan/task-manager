import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./tasks/reducer";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export default store;
