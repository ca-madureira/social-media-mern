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
      providesTags: ["conversation"]

    }),
  }),
});

export const {
  useGetConversationBetweenUsersQuery,
  useGetAllUserConversationsQuery,
} = conversationApi;
