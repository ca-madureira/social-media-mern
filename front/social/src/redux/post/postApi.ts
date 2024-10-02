import { apiSlice } from '../api/apiSlice';
import { getUserPosts } from './postSlice';
// Importa suas interfaces

// types.ts
export interface PostData {
  content: string;
  // Adicione outros campos se necessário
}

export interface PostState {
  posts: PostData[];
}

export interface AuthorData {
  author: string; // Use string para ObjectId no front-end
}

export interface IdPost {
  id: string;
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
    getUserPosts: builder.query<PostState, AuthorData>({
      query: (authorData) => ({
        url: '/posts/allPosts',
        method: 'GET',
        params: { author: authorData.author },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          console.log('info', data);
          dispatch(getUserPosts(data)); // Despacha os posts obtidos
        } catch (error: any) {
          console.error('Erro ao processar a solicitação:', error);
        }
      },
    }),
    deletePostById: builder.mutation<void, string>({
      query: (idPost) => ({
        url: `/posts/delete/${idPost}`,
        method: 'DELETE',
        credentials: 'include' as const,
      }),
    }),
    editPost: builder.mutation<void, { id: string; content: string }>({
      query: ({ id, content }) => ({
        url: `/posts/update/${id}`,
        method: 'PUT',
        body: { content },
        credentials: 'include' as const,
      }),
    }),
    votePost: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/posts/vote/${id}`,
        method: 'PUT',
        credentials: 'include' as const,
      }),
    }),
    reactPost: builder.mutation<void, { id: string; react: string }>({
      query: ({ id, react }) => ({
        url: `/posts/reaction/${id}`,
        method: 'PUT',
        body: { reaction: react }, // Inclui o body da requisição
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetUserPostsQuery,
  useDeletePostByIdMutation,
  useEditPostMutation,
  useVotePostMutation,
  useReactPostMutation,
} = postApi;
