import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PostData {
  content: string;
  //votes: number;
}

export interface PostState {
  posts: PostData[];
}

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getUserPosts: (state, action: PayloadAction<PostState>) => {
      console.log('Payload recebido em getUserPosts:', action.payload.posts);

      state.posts = action.payload.posts;
    },
  },
});

export const { getUserPosts } = postSlice.actions;
export default postSlice.reducer;
