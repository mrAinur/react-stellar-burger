import { createAction } from "@reduxjs/toolkit";
import { ServerMessage } from "../../../../utils/types";

export const wsOrdersConnect = createAction(
  "WS_ORDERS_CONNECT",
  (item: string) => {
    return { payload: item };
  },
);
export const wsOrdersDisconnect = createAction("WS_ORDERS_DISCONNECT");
export const wsOrdersConnecting = createAction("WS_ORDERS_CONNECTING");
export const wsOrdersOpen = createAction("WS_ORDERS_OPEN");
export const wsOrdersClose = createAction("WS_ORDERS_CLOSE");
export const wsOrdersMessage = createAction(
  "WS_ORDERS_MESSAGE",
  (obj: ServerMessage) => {
    return { payload: obj };
  },
);
export const wsOrdersError = createAction("WS_ORDERS_ERROR", (text: string) => {
  return { payload: text };
});
