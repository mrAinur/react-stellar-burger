import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: {
    email: "",
    password: ""
  },
  isAuthChecked: false
}

const login = createSlice({
  name: 'login',
  initialState,
  reducers: {
    checkedUser: (state) => {
      state.isAuthChecked = true
    },
    changeLoginInfo: (state, action) => {
      action.payload.name === "email" ? 
      state.login.email = action.payload.value : 
      state.login.password = action.payload.value
    },
    clearLoginInfo: (state) => { 
      state.login.email = "" 
      state.login.password = ""
    }
  }
})

export const loginUser = login.reducer;
export const { checkedUser, changeLoginInfo, clearLoginInfo } = login.actions;