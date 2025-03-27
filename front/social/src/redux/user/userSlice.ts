import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  _id: string;
  name: string;
  email: string;
  avatar: string; // Adicione o campo avatar aqui
  friends: object[];
  invites: object[];
}

const initialState: UserData = {
  _id: "",
  name: "",
  email: "",
  avatar: "",
  friends: [],
  invites: [],
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;
