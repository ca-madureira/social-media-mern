import { apiSlice } from '../api/apiSlice';
import { getUserPosts } from './postSlice';
// Importa suas interfaces

// types.ts
export interface PostData {
  content: string;
  // Adicione outros campos se necessário
}

export interface AuthorData {
  author: string; // Use string para ObjectId no front-end
}

const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<void, PostData>({
      query: (postData) => ({
        url: '/posts/create',
        method: 'POST',
        body: postData,
      }),
    }),
    getUserPosts: builder.query<PostData[], AuthorData>({
      query: (authorData) => ({
        url: '/posts/allPosts',
        method: 'GET',
        params: { author: authorData.author },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          // dispatch(
          //   getUserPosts(result),
          // );
        } catch (error: any) {
          console.error('Erro ao processar a solicitação:', error);
        }
      },
    }),
  }),
});

export const { useCreatePostMutation, useGetUserPostsQuery } = postApi;
