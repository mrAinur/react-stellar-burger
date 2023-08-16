import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { getOrderData } from "./pages/constructore/burger-constructor/services/burger-ingredients";
import { getIngredientsData } from "./pages/constructore/burger-ingredients/services/burger-ingredients";
import { loginUser } from "./pages/login/services/login";
import { user } from "./pages/profile/services/profile";
import { wsFeedReducer } from "./pages/feeds/services/reducers/feedReducers";
import {
  wsFeedConnect,
  wsFeedDisconnect,
  wsFeedConnecting,
  wsFeedOpen,
  wsFeedClose,
  wsFeedMessage,
  wsFeedError,
} from "./pages/feeds/services/actions/feedActions";
import {
  wsOrdersConnect,
  wsOrdersDisconnect,
  wsOrdersConnecting,
  wsOrdersOpen,
  wsOrdersClose,
  wsOrdersMessage,
  wsOrdersError,
} from "./pages/orders/services/actions/ordersActions";
import { wsOrdersReducer } from "./pages/orders/services/reducers/ordersReducers";
import { socketMiddleware } from "./utils/socketMiddleware";

const universalSocketMiddleware = socketMiddleware({
  wsFeedConnect,
  wsFeedDisconnect,
  wsFeedConnecting,
  wsFeedOpen,
  wsFeedClose,
  wsFeedMessage,
  wsFeedError,
  wsOrdersConnect,
  wsOrdersDisconnect,
  wsOrdersConnecting,
  wsOrdersOpen,
  wsOrdersClose,
  wsOrdersMessage,
  wsOrdersError,
});

export const store = configureStore({
  reducer: {
    ingredients: getIngredientsData,
    order: getOrderData,
    login: loginUser,
    user,
    feed: wsFeedReducer,
    ordersHistory: wsOrdersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(universalSocketMiddleware),
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
