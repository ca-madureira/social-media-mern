import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PostState {
  content: string;
}

const initialState: PostState = {
  content: '',
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
  },
});

export const { setContent } = postSlice.actions;
export default postSlice.reducer;
