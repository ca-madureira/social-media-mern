import { apiSlice } from "../api/apiSlice";

export interface ConversationData {
  receiverId: string; // Agora somente receiverId é passado para o corpo da requisição
}

const conversationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint para buscar conversa, se necessário
    getConversation: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/conversations/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useDeleteConversationMutation, useGetConversationQuery } =
  conversationApi;
