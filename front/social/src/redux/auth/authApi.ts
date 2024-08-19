import { apiSlice } from '../api/apiSlice';
import { userLoggedOut, userRegistration } from './authSlice';

type User = {
  name: string;
  email: string;
};

type RegistrationResponse = {
  user: {
    token: string;
    user: User;
  };
};

type RegistrationData = {
  name: string;
  email: string;
  password: string;
  // avatar?: File;
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => {
        // const formData = new FormData();
        // formData.append('name', name);
        // formData.append('email', email);
        // formData.append('password', password);
        // if (avatar) formData.append('avatar', avatar);

        return {
          url: '/user/create',
          method: 'POST',
          body: data,
          credentials: 'include' as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
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

    login: builder.mutation<
      RegistrationResponse,
      { email: string; password: string }
    >({
      query: ({ email, password }) => ({
        url: '/user/create',
        method: 'POST',
        body: { email, password },
        credentials: 'include' as const,
      }),
    }),

    logOut: builder.query({
      query: () => ({
        url: 'logout',
        method: 'GET',
        credentials: 'include' as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLoggedOut());
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogOutQuery } =
  authApi;
