import { apiSlice } from '../api/apiSlice';

interface PostData {
  content: string;
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
  }),
});

export const { useCreatePostMutation } = postApi;
