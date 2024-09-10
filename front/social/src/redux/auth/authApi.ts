import { apiSlice } from '../api/apiSlice';
import { userLoggedOut, userRegistration, userLoggedIn } from './authSlice';

type User = {
  name: string;
  email: string;
  id: string;
  avatar: string;
};

type RegistrationResponse = {
  user: {
    token: string;
    user: User;
  };
};

type RegistrationData = FormData; // Atualizado para FormData

type LoginData = {
  email: string;
  password: string;
};

type LoginDataResponse = {
  token: string;
  user: {
    name: string;
    email: string;
    id: string;
  };
};

type SearchResponse = {
  users: User[];
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: '/user/create',
        method: 'POST',
        body: data,
        credentials: 'include' as const,
        headers: {
          // Removido o header 'Content-Type', pois o FormData já define isso automaticamente
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.user.token,
              user: result.data.user.user,
            }),
          );
        } catch (error: any) {
          console.error('Erro ao processar a solicitação:', error);
        }
      },
    }),

    login: builder.mutation<LoginDataResponse, LoginData>({
      query: ({ email, password }) => ({
        url: '/user/login',
        method: 'POST',
        body: { email, password },
        credentials: 'include' as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.token,
              user: result.data.user,
            }),
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    deleteAccount: builder.mutation<void, string>({
      query: (idUser) => ({
        url: `/user/delete/${idUser}`,
        method: 'DELETE',
        credentials: 'include' as const,
      }),
    }),

    searchUsers: builder.query<
      SearchResponse,
      { name?: string; email?: string }
    >({
      query: ({ name, email }) => ({
        url: '/user/search',
        method: 'GET',
        params: { name, email },
        credentials: 'include' as const,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useDeleteAccountMutation,
  useSearchUsersQuery,
} = authApi;
