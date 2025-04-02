import { apiSlice } from "../api/apiSlice";
import { notify } from "../notify/notifySlice";
import { UserData } from "../../interfaces";
import {
  IdInvite,
  SearchParams,
  InvitesResponse,
  User,
  UserSearch,
} from "../../interfaces";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchFriends: builder.query<UserSearch[], SearchParams>({
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
      invalidatesTags: ["user", "invites"],
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // Corrigido para usar a estrutura correta de dispatch
          console.log("comunicar", result);
          dispatch(
            notify({
              user: {
                avatar: result.data.avatar,
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
    unfriend: builder.mutation<void, IdInvite>({
      query: ({ id }) => ({
        url: `/user/unfriend/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["user"]
    }),
    declineInvite: builder.mutation<void, IdInvite>({
      query: ({ id }) => ({
        url: `/user/decline/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["invites"],
    }),
    getUser: builder.query<UserData, IdInvite>({
      query: ({ id }) => {
        console.log("ID dentro da query:", id);  // Verificando o valor de id na query
        return {
          url: `/user/${id}`,
          method: "GET",
        };
      },
      providesTags: ["user"],

    }),
  }),
});

export const {
  useSearchFriendsQuery,
  useSendInviteMutation,
  useAcceptInviteMutation,
  useDeclineInviteMutation,
  useUnfriendMutation,
  useAllInvitesQuery,
  useGetUserQuery,
} = userApi;
