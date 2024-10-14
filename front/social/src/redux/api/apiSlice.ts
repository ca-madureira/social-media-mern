import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    credentials: 'include',
    prepareHeaders: (headers) => {
      // Pegue o token do localStorage
      const token = localStorage.getItem('token');

      // Se o token existir, adicione o cabeçalho Authorization
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['posts', 'invites'],
  endpoints: () => ({}),
});
