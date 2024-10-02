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

type RegistrationData = {}; // Atualizado

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
    registerUser: builder.mutation<any, RegistrationData>({
      query: (data) => ({
        url: '/user/create',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log('Resultado: ', result);
          console.log('valores de cadastro de usuario', result.data.user.user);
          dispatch(
            userRegistration({
              token: result.data?.user?.token || '',
              user: result.data.user || { name: '', email: '', id: '' },
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
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // dispatch(
          //   userLoggedIn({
          //     accessToken: result.data?.token || '',
          //     user: result.data?.user || { name: '', email: '', id: '' },
          //   }),
          // );
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
        url: '/user/forgotPass',
        method: 'POST',
        body: data,
      }),
    }),
    verifyCode: builder.mutation<void, any>({
      query: (data) => ({
        url: '/user/verifyCode',
        method: 'POST',
        body: data,
      }),
    }),
    updatePass: builder.mutation<void, any>({
      query: (data) => ({
        url: '/user/updatePass',
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
