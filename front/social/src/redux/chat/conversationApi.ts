import { apiSlice } from "../api/apiSlice";
import { ConversationState } from "../../interfaces";

const conversationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversationBetweenUsers: builder.query<any, ConversationState>({
      query: ({ senderId, receiverId }) => ({
        url: `/conversations/`,
        method: "POST",
        body: { senderId, receiverId },
      }),
      providesTags: ["message"],
    }),
    getAllUserConversations: builder.query<any, void>({
      query: () => ({
        url: `/conversations/friends`,
        method: "GET",
      }),
       async onQueryStarted(_, { queryFulfilled, dispatch }) {
              try {
                const { data } = await queryFulfilled;
                console.log("todas as conversas:", data);
                
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
  }),
});

export const {
  useGetConversationBetweenUsersQuery,
  useGetAllUserConversationsQuery,
} = conversationApi;
