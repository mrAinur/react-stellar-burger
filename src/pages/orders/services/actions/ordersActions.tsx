import { createAction } from "@reduxjs/toolkit";
import { ServerMessage } from "../../../../utils/types";

export const wsOrdersConnect = createAction(
  "WS_FEED_CONNECT",
  (item: string) => {
    return { payload: item };
  },
);
export const wsOrdersDisconnect = createAction("WS_FEED_DISCONNECT");
export const wsOrdersConnecting = createAction("WS_FEED_CONNECTING");
export const wsOrdersOpen = createAction("WS_FEED_OPEN");
export const wsOrdersClose = createAction("WS_FEED_CLOSE");
export const wsOrdersMessage = createAction(
  "WS_FEED_MESSAGE",
  (obj: ServerMessage) => {
    return { payload: obj };
  },
);
export const wsOrdersError = createAction("WS_FEED_ERROR", (text: string) => {
  return { payload: text };
});
