import { createSlice } from '@reduxjs/toolkit';

const getActiveButton = createSlice({
  name: 'activeButton',
  initialState: {
    activeButton: "constructor"
  },
  reducers: {
    changeActiveButton: (state, action) => {
      state.activeButton = action.payload
    } 
  }
})

export const getButton = getActiveButton.reducer;
export const { changeActiveButton } = getActiveButton.actions;