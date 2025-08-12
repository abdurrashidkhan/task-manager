import { configureStore } from '@reduxjs/toolkit'
import tasks from '../task/task'
import baseApi from './api/baseApi'
const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    tasks:tasks,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware)
})

export default store