import { createReducer } from "@reduxjs/toolkit";
import { wsOrdersConnecting, wsOrdersOpen, wsOrdersClose, wsOrdersMessage, wsOrdersError } from "../actions/ordersActions";

const initialState = {
    status: "offline",
    orders: [],
    connectionError: ""
}

export const wsOrdersReducer = createReducer(initialState, builder => {
    builder
        .addCase(wsOrdersConnecting, state => {state.status = "connecting"})
        .addCase(wsOrdersOpen, state => {
            state.status = "online";
            state.connectionError = ""
        })
        .addCase(wsOrdersClose, state => {state.status = "offline"})
        .addCase(wsOrdersMessage, (state, action) => {
            state.orders = action.payload.orders
        })
        .addCase(wsOrdersError, (state, action) => {
            state.connectionError = action.payloud
        })
})