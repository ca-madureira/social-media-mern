import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PostData {
  content: string;
  //votes: number;
  // Adicione outros campos se necessário
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
      // Adicione o console.log para inspecionar o payload
      console.log('Payload recebido em getUserPosts:', action.payload.posts);

      // Sobrescreve o array de posts com os novos posts
      state.posts = action.payload.posts;
    },
  },
});

export const { getUserPosts } = postSlice.actions;
export default postSlice.reducer;
