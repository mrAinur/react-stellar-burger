import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { getOrderData } from "./components/pages/constructore/burger-constructor/services/burger-ingredients";
import { getIngredientsData } from "./components/pages/constructore/burger-ingredients/services/burger-ingredients";
import { loginUser } from "./components/pages/login/services/login";
import { getButton } from "./components/app-header/service/app-header";
import { registrationUser } from "./components/pages/registration/services/registration";
import { user } from "./components/pages/profile/services/profile";
import { resetEmailUserForPassword } from "./components/pages/forgot-password/services/forgot-password";
import { resetPasswordWithToken } from "./components/pages/reset-password/services/reset-password";

const store = configureStore({
  reducer: {
    activeButton: getButton,
    ingredients: getIngredientsData,
    order: getOrderData,
    login: loginUser,
    registration: registrationUser,
    user,
    resetEmail: resetEmailUserForPassword,
    resetPassword: resetPasswordWithToken
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [],});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
