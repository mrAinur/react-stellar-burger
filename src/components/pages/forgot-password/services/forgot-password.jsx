import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: ""
}

const resetEmail = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload
    }
  }
})

export const resetEmailUserForPassword = resetEmail.reducer;
export const { setEmail } = resetEmail.actions;