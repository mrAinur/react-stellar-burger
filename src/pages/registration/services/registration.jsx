import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registration: {
    name: "",
    email: "",
    password: "",
  },
};

const registration = createSlice({
  name: "registration",
  initialState,
  reducers: {
    changeRegistrationData: (state, action) => {
      action.payload.name === "name"
        ? (state.registration.name = action.payload.value)
        : action.payload.name === "email"
        ? (state.registration.email = action.payload.value)
        : (state.registration.password = action.payload.value);
    },
    clearRegistration: state => {
      state.registration.name = "";
      state.registration.email = "";
      state.registration.password = "";
    },
  },
});

export const registrationUser = registration.reducer;
export const { changeRegistrationData, clearRegistration } =
  registration.actions;
