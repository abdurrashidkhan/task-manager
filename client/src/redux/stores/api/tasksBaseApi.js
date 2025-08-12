import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000 " }),
  endpoints: (builder) => ({
    // GET request to fetch all tasks
    getTasks: builder.query({
      query: () => "/tasks",
    }),

    // POST request to create a new task
    createTask: builder.mutation({
      query: (taskData) => ({
        url: "/create-task",
        method: "POST",
        body: taskData,
      }),
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation } = baseApi;
export default baseApi;


