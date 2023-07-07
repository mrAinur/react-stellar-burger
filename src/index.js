import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { getOrderData } from "./components/burger-constructor/services/burger-ingredients"; 
import { getIngredientsData } from "./components/burger-ingredients/services/burger-ingredients"; 
import { loginUser } from "./pages/login/services/login"; 
import { registrationUser } from "./pages/registration/services/registration"; 
import { user } from "./pages/profile/services/profile"; 
import { resetPasswordWithToken } from "./pages/reset-password/services/reset-password"; 
import { BrowserRouter as Router } from "react-router-dom";

const store = configureStore({
  reducer: {
    ingredients: getIngredientsData,
    order: getOrderData,
    login: loginUser,
    registration: registrationUser,
    user,
    resetPassword: resetPasswordWithToken
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [],
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
