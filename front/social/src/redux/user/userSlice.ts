import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces";


const initialState: User = {
  id: "",
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
    setUser: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;
