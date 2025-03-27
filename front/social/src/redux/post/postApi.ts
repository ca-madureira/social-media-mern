import { apiSlice } from "../api/apiSlice";
import { getUserPosts } from "./postSlice";

import {
  IdPost,
  PostState,
  PostData,
  IdUser,
  PostItem,
} from "../../interfaces";

const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<void, PostItem>({
      query: (postData) => ({
        url: "/posts/create",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["posts"],
    }),
    getUserPosts: builder.query<PostState, IdUser>({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      providesTags: ["posts"],
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          console.log("INFORMACOES DE RETORNO DO POST:", data);
          dispatch(getUserPosts(data));
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
    deletePostById: builder.mutation<void, IdPost>({
      query: (idPost) => ({
        url: `/posts/delete/${idPost}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
      invalidatesTags: ["posts"],
    }),
    editPost: builder.mutation<void, { id: string; content: string }>({
      query: ({ id, content }) => ({
        url: `/posts/update/${id}`,
        method: "PUT",
        body: { content },
        credentials: "include" as const,
      }),
      invalidatesTags: ["posts"],
    }),
    votePost: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/posts/vote/${id}`,
        method: "PUT",
        credentials: "include" as const,
      }),

      invalidatesTags: ["posts"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetUserPostsQuery,
  useDeletePostByIdMutation,
  useEditPostMutation,
  useVotePostMutation,
} = postApi;
