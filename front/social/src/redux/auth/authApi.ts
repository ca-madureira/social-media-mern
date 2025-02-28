import { apiSlice } from "../api/apiSlice";
import { userAuthentication } from "./authSlice";
import { setUser } from "../user/userSlice";

import {
  AuthResponse,
  AuthRegister,
  AuthLogin,
  SearchResponse,
  IdUser,
} from "../../interfaces";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<AuthResponse, AuthRegister>({
      query: (data) => ({
        url: "/auth/create",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          console.log("CONTEUDO PARA NAO PERDER: ", result);

          dispatch(
            userAuthentication({
              id: result.data.user.id,
              name: result.data.user.name,
              email: result.data.user.email,
              avatar: result.data.user.avatar,
              friends: result.data.user.friends,
              invites: result.data.user.invites,
              token: result.data.token,
            })
          );
          dispatch(
            setUser({
              id: result.data.user.id,
              name: result.data.user.name,
              email: result.data.user.email,
              avatar: result.data.user.avatar,
              friends: result.data.user.friends,
              invites: result.data.user.invites,
            })
          );
        } catch (error: unknown) {
          // Usando 'unknown'
          if (error instanceof Error) {
            // Verificando se é uma instância de Error
            console.error("Erro ao processar a solicitação:", error.message);
          } else {
            console.error("Erro desconhecido:", error);
          }
        }
      },
    }),
    login: builder.mutation<AuthResponse, AuthLogin>({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          console.log("CONTEUDO PARA NAO PERDER: ", result.data.user.id);

          dispatch(
            userAuthentication({
              id: result.data.user.id,
              name: result.data.user.name,
              email: result.data.user.email,
              avatar: result.data.user.avatar,
              friends: result.data.user.friends,
              invites: result.data.user.invites,
              token: result.data.token,
            })
          );
          dispatch(
            setUser({
              id: result.data.user.id,
              name: result.data.user.name,
              email: result.data.user.email,
              avatar: result.data.user.avatar,
              friends: result.data.user.friends,
              invites: result.data.user.invites,
            })
          );
        } catch (error: unknown) {
          // Usando 'unknown'
          if (error instanceof Error) {
            // Verificando se é uma instância de Error
            console.error("Erro ao processar a solicitação:", error.message);
          } else {
            console.error("Erro desconhecido:", error);
          }
        }
      },
    }),
    deleteAccount: builder.mutation<void, IdUser>({
      query: (idUser) => ({
        url: `/user/delete/${idUser}`,
        method: "DELETE",
        credentials: "include" as const,
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
          url: "/user/search",
          method: "GET",
          params,
          credentials: "include" as const,
        };
      },
    }),
    sendForgotPasswordCode: builder.mutation<void, string>({
      query: (data) => ({
        url: "/auth/forgotPass",
        method: "POST",
        body: data,
      }),
    }),
    verifyCode: builder.mutation<void, string>({
      query: (data) => ({
        url: "/auth/verifyCode",
        method: "POST",
        body: data,
      }),
    }),
    updatePass: builder.mutation<void, string>({
      query: (data) => ({
        url: "/auth/updatePass",
        method: "PUT",
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
