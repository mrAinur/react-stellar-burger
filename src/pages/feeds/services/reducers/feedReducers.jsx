import { createReducer } from "@reduxjs/toolkit";
import { wsFeedConnecting, wsFeedOpen, wsFeedClose, wsFeedMessage, wsFeedError } from "../actions/feedActions";

const initialState = {
    status: "offline",
    feeds: {orders: []},
    connectionError: ""
}

export const wsFeedReducer = createReducer(initialState, builder => {
    builder
        .addCase(wsFeedConnecting, state => {state.status = "connecting"})
        .addCase(wsFeedOpen, state => {
            state.status = "online";
            state.connectionError = ""
        })
        .addCase(wsFeedClose, state => {state.status = "offline"})
        .addCase(wsFeedMessage, (state, action) => {
            state.feeds = action.payload
        })
        .addCase(wsFeedError, (state, action) => {
            state.connectionError = action.payloud
        })
})