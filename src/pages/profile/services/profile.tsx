import { createSlice } from "@reduxjs/toolkit";

type State = {
  getUser: boolean;
  user: {
    email: string;
    name: string;
  };
  setUserData: {
    email: string;
    name: string;
    password: string;
  };
};

const initialState: State = {
  getUser: false,
  user: {
    email: "",
    name: "",
  },
  setUserData: {
    email: "",
    name: "",
    password: "",
  },
};

const userData = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserInfo: (state, action) => {
      state.user.email = action.payload.email;
      state.user.name = action.payload.name;
      state.setUserData.email = action.payload.email;
      state.setUserData.name = action.payload.name;
      state.getUser = true;
    },
    cancelSetUserInfo: state => {
      state.setUserData = {
        email: state.user.email,
        name: state.user.name,
        password: "",
      };
    },
    reset: () => initialState,
  },
});

export const user = userData.reducer;
export const { getUserInfo, cancelSetUserInfo, reset } = userData.actions;
