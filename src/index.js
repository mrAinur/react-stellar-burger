import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/app";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { getOrderData } from "./components/burger-constructor/services/burger-ingredients";
import { getIngredientsData } from "./components/burger-ingredients/services/burger-ingredients";

const store = configureStore({
  reducer: {
    ingredients: getIngredientsData,
    order: getOrderData
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
