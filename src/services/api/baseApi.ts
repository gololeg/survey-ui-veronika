import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/',
    credentials: 'include',
  }),
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['Task'],
})
