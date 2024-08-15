import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  user: {
    name: '',
    email: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    // userLoggedIn: (
    //   state,
    //   action: PayloadAction<{ accessToken: string; user: string }>,
    // ) => {
    //   state.token = action.payload.accessToken;
    //   state.user.name = action.payload.user;
    //   state.user.email = action.payload.email;
    // },
    userLoggedOut: (state) => {
      state.token = '';
      state.user.name = '';
      state.user.email = '';
    },
  },
});

export const { userRegistration, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
