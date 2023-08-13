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
    setUserInfo: (state, action) => {
      action.payload.name === "name"
        ? (state.setUserData.name = action.payload.value)
        : action.payload.name === "email"
        ? (state.setUserData.email = action.payload.value)
        : (state.setUserData.password = action.payload.value);
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
export const { getUserInfo, setUserInfo, cancelSetUserInfo, reset } =
  userData.actions;
