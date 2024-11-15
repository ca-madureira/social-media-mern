import { apiSlice } from '../api/apiSlice';
import { getUserPosts } from './postSlice';

export interface PostData {
  content: string;
}

export interface PostState {
  posts: PostData[];
}

export interface AuthorData {
  author: string;
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
      invalidatesTags: ['posts'],
    }),
    getUserPosts: builder.query<any, any>({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: 'GET',
      }),
      providesTags: ['posts'],
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          console.log('INFORMACOES DE RETORNO DO POST:', data);
          dispatch(getUserPosts(data));
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
    votePost: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/posts/vote/${id}`,
        method: 'PUT',
        credentials: 'include' as const,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          console.log('quantidade de votos', result.data.votes);
        } catch (error: any) {
          console.log(error);
        }
      },
      invalidatesTags: ['posts'],
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
