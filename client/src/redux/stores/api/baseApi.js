import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// RTK QUERY 
const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/'
  }),
  endpoints: {}
})
export default baseApi