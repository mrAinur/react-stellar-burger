import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { getOrderData } from "../pages/constructore/burger-constructor/services/burger-ingredients";
import { getIngredientsData } from "../pages/constructore/burger-ingredients/services/burger-ingredients";
import { loginUser } from "../pages/login/services/login";
import { registrationUser } from "../pages/registration/services/registration";
import { user } from "../pages/profile/services/profile";
import { resetPasswordWithToken } from "../pages/reset-password/services/reset-password";
import { wsFeedReducer } from "../pages/feeds/services/reducers/feedReducers";
import { feedSocketMiddleware } from "../pages/feeds/services/middleware/feedMiddleware";
import {
  wsFeedConnect,
  wsFeedDisconnect,
  wsFeedConnecting,
  wsFeedOpen,
  wsFeedClose,
  wsFeedMessage,
  wsFeedError,
} from "../pages/feeds/services/actions/feedActions";
import { ordersSocketMiddleware } from "../pages/orders/services/middleware/ordersMiddleware";
import {
  wsOrdersConnect,
  wsOrdersDisconnect,
  wsOrdersConnecting,
  wsOrdersOpen,
  wsOrdersClose,
  wsOrdersMessage,
  wsOrdersError,
} from "../pages/orders/services/actions/ordersActions";
import { wsOrdersReducer } from "../pages/orders/services/reducers/ordersReducers";

const feedMiddleware = feedSocketMiddleware({
  wsFeedConnect,
  wsFeedDisconnect,
  wsFeedConnecting,
  wsFeedOpen,
  wsFeedClose,
  wsFeedMessage,
  wsFeedError,
});
const orderMiddleware = ordersSocketMiddleware({
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
    registration: registrationUser,
    user,
    resetPassword: resetPasswordWithToken,
    feed: wsFeedReducer,
    ordersHistory: wsOrdersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(feedMiddleware, orderMiddleware),
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
