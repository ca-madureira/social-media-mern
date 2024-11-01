import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiSlice } from '../api/apiSlice';
import { notify } from '../notify/notifySlice';

interface Post {
  _id: string;
  content: string;
  likes: string[];
  author: {
    _id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

interface Friend {
  id: string;
  name: string;
  email: string;
}

interface SearchParams {
  name?: string;
  email?: string;
}

export interface AuthorData {
  _id: string;
}

interface IdFriend {
  id: string;
}

interface FriendInvite {
  name?: string;
  email?: string;
  _id?: string;
}

interface FriendOficial {
  _id?: string;
  name?: string;
  email?: string;
}

interface InvitesResponse {
  invites: FriendInvite[];
}

interface FriendsResponse {
  friends: FriendOficial[];
}

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchFriends: builder.query<Friend[], SearchParams>({
      query: (params) => ({
        url: '/user/search',
        params,
      }),
    }),
    sendInvite: builder.mutation<Friend, IdFriend>({
      query: ({ id }) => ({
        url: `/user/invite/${id}`,
        method: 'PUT',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // Corrigido para usar a estrutura correta de dispatch
          console.log('comunicar', result.data.email);
          dispatch(
            notify({
              user: {
                name: result.data.name,
                email: result.data.email,
              }, // Ajustar conforme a estrutura do seu resultado
            }),
          );
        } catch (error: any) {
          console.error('Erro ao processar a solicitação:', error);
        }
      },
    }),
    allInvites: builder.query<InvitesResponse, any>({
      query: ({ id }) => ({
        url: `/user/invites/${id}`,
        method: 'GET',
      }),
      providesTags: ['invites'],

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          console.log('info do api', data);
          // dispatch(notify(data)); // Despacha os posts obtidos
        } catch (error: any) {
          console.error('Erro ao processar a solicitação:', error);
        }
      },
    }),
    acceptInvite: builder.mutation<void, IdFriend>({
      query: ({ id }) => ({
        url: `/user/accept/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['invites'],
    }),
    declineInvite: builder.mutation<void, IdFriend>({
      query: ({ id }) => ({
        url: `/user/decline/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['invites'],
    }),
    getUser: builder.query<any, any>({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
  }),
});

export const {
  useSearchFriendsQuery,
  useSendInviteMutation,
  useAcceptInviteMutation,
  useDeclineInviteMutation,
  useAllInvitesQuery,
  useGetUserQuery,
} = userApi;
