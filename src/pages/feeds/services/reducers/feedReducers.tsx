import { createReducer } from "@reduxjs/toolkit";
import {
  wsFeedConnecting,
  wsFeedOpen,
  wsFeedClose,
  wsFeedMessage,
  wsFeedError,
} from "../actions/feedActions";
import { Order } from "../../../../utils/types";

type State = {
  status: string;
  feeds: {
    orders: Order[];
    success: boolean;
    total: number;
    totalToday: number;
  };
  connectionError: string;
};

const initialState: State = {
  status: "offline",
  feeds: {
    orders: [],
    success: false,
    total: 0,
    totalToday: 0,
  },
  connectionError: "",
};

export const wsFeedReducer = createReducer(initialState, builder => {
  builder
    .addCase(wsFeedConnecting, state => {
      state.status = "connecting";
    })
    .addCase(wsFeedOpen, state => {
      state.status = "online";
      state.connectionError = "";
    })
    .addCase(wsFeedClose, state => {
      state.status = "offline";
    })
    .addCase(wsFeedMessage, (state, action) => {
      state.feeds = action.payload;
    })
    .addCase(wsFeedError, (state, action) => {
      state.connectionError = action.payload;
    });
});
