import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiSlice } from '../api/apiSlice';
import { notify } from '../notify/notifySlice';

interface Post {
  _id: string; // ID do post
  content: string; // Conteúdo do post
  likes: string[]; // Array de IDs dos usuários que curtiram o post
  author: {
    _id: string;
    name: string;
    avatar?: string; // Avatar do autor (se houver)
  }; // Dados do autor do post
  createdAt: string; // Data de criação
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
  _id: string; // Use string para ObjectId no front-end
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

export const friendsApi = apiSlice.injectEndpoints({
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
      }, // <--- Adicionada chave de fechamento aqui
    }), // <--- Adicionado parêntese de fechamento aqui
    allInvites: builder.query<InvitesResponse, void>({
      query: () => ({
        url: '/user/invites',
        method: 'GET',
      }),
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     console.log('info do api', data);
      //     // dispatch(notify(data)); // Despacha os posts obtidos
      //   } catch (error: any) {
      //     console.error('Erro ao processar a solicitação:', error);
      //   }
      // },
    }),
    acceptInvite: builder.mutation<void, IdFriend>({
      query: ({ id }) => ({
        url: `/user/accept/${id}`,
        method: 'PUT',
      }),
    }),
    allFriends: builder.query<FriendsResponse, void>({
      // Atualizado para não esperar argumentos
      query: () => ({
        url: '/user/friends',
        method: 'GET',
      }),
    }),
    getFriendPosts: builder.query<Post[], void>({
      query: () => ({
        url: 'user/friends/posts',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSearchFriendsQuery,
  useSendInviteMutation,
  useAcceptInviteMutation,
  useAllInvitesQuery,
  useAllFriendsQuery,
  useGetFriendPostsQuery,
} = friendsApi;
