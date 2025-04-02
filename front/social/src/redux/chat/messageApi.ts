import { apiSlice } from "../api/apiSlice";

export interface MessageData {
  senderId: string,
  receiverId: string,
  message: string
}

const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMessage: builder.mutation<void, MessageData>({
      query: (messageData) => ({
        url: "/messages/create",
        method: "POST",
        body: messageData,
      }),
      invalidatesTags: ["message", "conversation"],
    }),
  }),
});

export const { useCreateMessageMutation } = messageApi;
