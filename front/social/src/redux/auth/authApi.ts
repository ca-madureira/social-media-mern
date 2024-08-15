import { apiSlice } from '../api/apiSlice';
import { userLoggedOut, userRegistration } from './authSlice';

type RegistrationResponse = {
  user: {
    token: '';
    user: {
      name: string;
      email: string;
    };
  };
};

type RegistrationData = {
  name: string;
  email: string;
  password: string;
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: '/user/create',
        method: 'POST',
        body: data,
        credentials: 'include' as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(userRegistration({ token: result.data.user.token }));
          console.log('o resultado é:', result.data.user.token);
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        body: {
          email,
          password,
        },
        credentials: 'include' as const,
      }),
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   try {
      //     const result = await queryFulfilled;
      //     dispatch(
      //       userLoggedIn({
      //         accessToken: result.data.accessToken,
      //         user: result.data.user,
      //       }),
      //     );
      //   } catch (error: any) {
      //     console.log(error);
      //   }
      // },
    }),

    logOut: builder.query({
      query: () => ({
        url: 'logout',
        method: 'GET',

        credentials: 'include' as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,

  useLoginMutation,

  useLogOutQuery,
} = authApi;
