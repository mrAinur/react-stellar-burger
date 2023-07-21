import { createAction } from "@reduxjs/toolkit";

export const wsOrdersConnect = createAction("WS_FEED_CONNECT");
export const wsOrdersDisconnect = createAction("WS_FEED_DISCONNECT");
export const wsOrdersConnecting = createAction("WS_FEED_CONNECTING");
export const wsOrdersOpen = createAction("WS_FEED_OPEN");
export const wsOrdersClose = createAction("WS_FEED_CLOSE");
export const wsOrdersMessage = createAction("WS_FEED_MESSAGE");
export const wsOrdersError = createAction("WS_FEED_ERROR");
