import { apiSlice } from "../api/apiSlice";

export interface ConversationData {
  receiverId: string; // Agora somente receiverId é passado para o corpo da requisição
}

const conversationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mutação para excluir uma conversa
    deleteConversation: builder.mutation<void, ConversationData>({
      query: ({ receiverId }) => ({
        url: `/conversations/delete/${receiverId}`, // Passando receiverId como parâmetro de URL
        method: "DELETE",
        credentials: "include" as const, // Caso precise enviar cookies
      }),
      providesTags: ["conversations"],
    }),

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
