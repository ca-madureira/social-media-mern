import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const backendUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://social-media-mern-9ans.vercel.app'
    : 'http://localhost:8000';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: backendUrl,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['user', 'posts', 'invites'],
  endpoints: () => ({}),
});
