import { apiSlice } from "../api/apiSlice";

export interface MessageData {
  content: string;
}

const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMessage: builder.mutation<void, MessageData>({
      query: (messageData) => ({
        url: "/messages/create",
        method: "POST",
        body: messageData,
      }),
      providesTags: ["messages"],
    }),
  }),
});

export const { useCreateMessageMutation } = messageApi;
