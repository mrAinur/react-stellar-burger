import { createSlice } from "@reduxjs/toolkit";

type State = {
  login: {
    email: string;
    password: string;
  };
  isAuthChecked: boolean;
};

const initialState: State = {
  login: {
    email: "",
    password: "",
  },
  isAuthChecked: false,
};

const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    checkedUser: state => {
      state.isAuthChecked = true;
    },
    clearLoginInfo: state => {
      state.login.email = "";
      state.login.password = "";
    },
  },
});

export const loginUser = login.reducer;
export const { checkedUser, clearLoginInfo } = login.actions;
