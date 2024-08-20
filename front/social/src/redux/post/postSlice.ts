import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PostState {
  posts: string[];
}

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // setContent: (state, action: PayloadAction<string>) => {
    //   state.content = action.payload;
    // },
    getUserPosts: (state, action: PayloadAction<string>) => {
      // state.posts.push = action.payload;
      state.posts.push(action.payload);
    },
  },
});

export const { getUserPosts } = postSlice.actions;
export default postSlice.reducer;
