import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: "",
    reset: {
        password: "",
        token: ""
    }
}

const resetPassword = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload
    },
    resetPasswordWithEmail: (state, action) => {
        action.payload.name === "password" ? 
        state.reset.password = action.payload.value : 
        state.reset.token = action.payload.value
    },
    clearPasswordWithEmail: () => initialState
  }
})

export const resetPasswordWithToken = resetPassword.reducer;
export const { setEmail, resetPasswordWithEmail, clearPasswordWithEmail } = resetPassword.actions;