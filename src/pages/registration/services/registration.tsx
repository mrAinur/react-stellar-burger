import { createSlice } from "@reduxjs/toolkit";

type State = {
  name: string;
  email: string;
  password: string;
};

const initialState: State = {
  name: "",
  email: "",
  password: "",
};

const registration = createSlice({
  name: "registration",
  initialState,
  reducers: {
    changeRegistrationData: (state, action) => {
      action.payload.name === "name"
        ? (state.name = action.payload.value)
        : action.payload.name === "email"
        ? (state.email = action.payload.value)
        : (state.password = action.payload.value);
    },
    clearRegistration: state => {
      state.name = "";
      state.email = "";
      state.password = "";
    },
  },
});

export const registrationUser = registration.reducer;
export const { changeRegistrationData, clearRegistration } =
  registration.actions;
