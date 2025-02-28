import { apiSlice } from "../api/apiSlice";
import { notify } from "../notify/notifySlice";
import { UserData } from "./userSlice";
import {
  IdInvite,
  SearchParams,
  InvitesResponse,
  User,
} from "../../interfaces";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchFriends: builder.query<User[], SearchParams>({
      query: (params) => ({
        url: "/user/search",
        params,
      }),
    }),
    sendInvite: builder.mutation<User, IdInvite>({
      query: ({ id }) => ({
        url: `/user/invite/${id}`,
        method: "PUT",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // Corrigido para usar a estrutura correta de dispatch
          console.log("comunicar", result.data.email);
          dispatch(
            notify({
              user: {
                name: result.data.name,
                email: result.data.email,
              }, // Ajustar conforme a estrutura do seu resultado
            })
          );
        } catch (error: unknown) {
          // Verificando se o erro é uma instância de Error antes de acessar suas propriedades
          if (error instanceof Error) {
            console.error("Erro ao processar a solicitação:", error.message);
          } else {
            console.error("Erro desconhecido:", error);
          }
        }
      },
    }),
    allInvites: builder.query<InvitesResponse, IdInvite>({
      query: ({ id }) => ({
        url: `/user/invites/${id}`,
        method: "GET",
      }),
      providesTags: ["invites"],

      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("info do api", data);
          // dispatch(notify(data)); // Despacha os posts obtidos
        } catch (error: unknown) {
          // Verificando se o erro é uma instância de Error antes de acessar suas propriedades
          if (error instanceof Error) {
            console.error("Erro ao processar a solicitação:", error.message);
          } else {
            console.error("Erro desconhecido:", error);
          }
        }
      },
    }),
    acceptInvite: builder.mutation<void, IdInvite>({
      query: ({ id }) => ({
        url: `/user/accept/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["invites", "user"],
    }),
    declineInvite: builder.mutation<void, IdInvite>({
      query: ({ id }) => ({
        url: `/user/decline/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["invites"],
    }),
    getUser: builder.query<UserData, IdInvite>({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
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
