import { apiSlice } from '../api/apiSlice';
import { userAuthentication } from './authSlice';
import { setUser } from '../user/userSlice';

type User = {
  name: string;
  email: string;
  id: string;
  friends: object[];
  invites: object[];
  avatar: string;
};

type AuthResponse = {
  token: string;
  user: User;
};

type AuthData = {
  email: string;
  password: string;
};

type AuthRegister = {
  name: string;
  email: string;
  password: string;
};

type SearchResponse = {
  users: User[];
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<AuthResponse, AuthRegister>({
      query: (data) => ({
        url: '/auth/create',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          console.log('CONTEUDO PARA NAO PERDER: ', result);
          // console.log('Resultado: ', result);
          // console.log('valores de CADASTRO', result.data.token);
          // console.log('usuario criado: ', result.data.user);
          // console.log('token de usuario logado', result.data.token);
          dispatch(
            userAuthentication({
              id: result.data.user.id,
              name: result.data.user.name,
              email: result.data.user.email,
              avatar: result.data.user.avatar,
              friends: result.data.user.friends,
              invites: result.data.user.invites,
              token: result.data.token,
            }),
          );
          dispatch(
            setUser({
              id: result.data.user.id,
              name: result.data.user.name,
              email: result.data.user.email,
              avatar: result.data.user.avatar,
              friends: result.data.user.friends,
              invites: result.data.user.invites,
            }),
          );
        } catch (error: any) {
          console.error('Erro ao processar a solicitação:', error);
        }
      },
    }),
    login: builder.mutation<AuthResponse, AuthData>({
      query: ({ email, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { email, password },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          console.log('CONTEUDO PARA NAO PERDER: ', result.data.user.id);

          dispatch(
            userAuthentication({
              id: result.data.user.id,
              name: result.data.user.name,
              email: result.data.user.email,
              avatar: result.data.user.avatar,
              friends: result.data.user.friends,
              invites: result.data.user.invites,
              token: result.data.token,
            }),
          );
          dispatch(
            setUser({
              id: result.data.user.id,
              name: result.data.user.name,
              email: result.data.user.email,
              avatar: result.data.user.avatar,
              friends: result.data.user.friends,
              invites: result.data.user.invites,
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
      query: ({ name, email }) => {
        const params: { [key: string]: string } = {};
        if (name) params.name = name;
        if (email) params.email = email;
        return {
          url: '/user/search',
          method: 'GET',
          params,
          credentials: 'include' as const,
        };
      },
    }),
    sendForgotPasswordCode: builder.mutation<void, any>({
      query: (data) => ({
        url: '/auth/forgotPass',
        method: 'POST',
        body: data,
      }),
    }),
    verifyCode: builder.mutation<void, any>({
      query: (data) => ({
        url: '/auth/verifyCode',
        method: 'POST',
        body: data,
      }),
    }),
    updatePass: builder.mutation<void, any>({
      query: (data) => ({
        url: '/auth/updatePass',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginMutation,
  useDeleteAccountMutation,
  useSearchUsersQuery,
  useSendForgotPasswordCodeMutation,
  useVerifyCodeMutation,
  useUpdatePassMutation,
} = authApi;
