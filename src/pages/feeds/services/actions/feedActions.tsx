import { createAction } from "@reduxjs/toolkit";
import { ServerMessage } from "../../../../utils/types";

export const wsFeedConnect = createAction("WS_FEED_CONNECT", (item: string) => {
  return { payload: item };
});
export const wsFeedDisconnect = createAction("WS_FEED_DISCONNECT");
export const wsFeedConnecting = createAction("WS_FEED_CONNECTING");
export const wsFeedOpen = createAction("WS_FEED_OPEN");
export const wsFeedClose = createAction("WS_FEED_CLOSE");
export const wsFeedMessage = createAction(
  "WS_FEED_MESSAGE",
  (obj: ServerMessage) => {
    return { payload: obj };
  },
);
export const wsFeedError = createAction("WS_FEED_ERROR", (text: string) => {
  return { payload: text };
});
