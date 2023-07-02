import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    reset: {
        password: "",
        token: ""
    }
}

const resetPassword = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    resetPasswordWithEmail: (state, action) => {
        action.payload.name === "password" ? 
        state.reset.password = action.payload.value : 
        state.reset.token = action.payload.value
    },
    clearPasswordWithEmail: () => initialState
  }
})

export const resetPasswordWithToken = resetPassword.reducer;
export const { resetPasswordWithEmail, clearPasswordWithEmail } = resetPassword.actions;