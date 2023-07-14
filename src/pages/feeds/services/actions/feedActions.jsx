import { createAction } from "@reduxjs/toolkit";

export const wsFeedConnect = createAction("WS_FEED_CONNECT");
export const wsFeedDisconnect = createAction("WS_FEED_DISCONNECT");
export const wsFeedConnecting = createAction("WS_FEED_CONNECTING");
export const wsFeedOpen = createAction("WS_FEED_OPEN");
export const wsFeedClose = createAction("WS_FEED_CLOSE");
export const wsFeedMessage = createAction("WS_FEED_MESSAGE");
export const wsFeedError = createAction("WS_FEED_ERROR");