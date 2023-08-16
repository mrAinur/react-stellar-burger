import { Middleware, MiddlewareAPI } from "redux";
import {
  wsFeedConnect,
  wsFeedDisconnect,
  wsFeedConnecting,
  wsFeedOpen,
  wsFeedClose,
  wsFeedMessage,
  wsFeedError,
} from "../pages/feeds/services/actions/feedActions";
import {
  wsOrdersConnect,
  wsOrdersDisconnect,
  wsOrdersConnecting,
  wsOrdersOpen,
  wsOrdersClose,
  wsOrdersMessage,
  wsOrdersError,
} from "../pages/orders/services/actions/ordersActions";
import { AppDispatch, RootState } from "..";

type CheckActions = {
  readonly type?:
    | typeof wsFeedConnect.type
    | typeof wsFeedDisconnect.type
    | typeof wsFeedConnecting.type
    | typeof wsFeedOpen.type
    | typeof wsFeedClose.type
    | typeof wsFeedMessage.type
    | typeof wsFeedError.type
    | typeof wsOrdersConnect.type
    | typeof wsOrdersDisconnect.type
    | typeof wsOrdersConnecting.type
    | typeof wsOrdersOpen.type
    | typeof wsOrdersClose.type
    | typeof wsOrdersMessage.type
    | typeof wsOrdersError.type;
  readonly wsFeedConnect: typeof wsFeedConnect;
  readonly wsFeedDisconnect: typeof wsFeedDisconnect;
  readonly wsFeedConnecting: typeof wsFeedConnecting;
  readonly wsFeedOpen: typeof wsFeedOpen;
  readonly wsFeedClose: typeof wsFeedClose;
  readonly wsFeedMessage: typeof wsFeedMessage;
  readonly wsFeedError: typeof wsFeedError;
  readonly wsOrdersConnect: typeof wsOrdersConnect;
  readonly wsOrdersDisconnect: typeof wsOrdersDisconnect;
  readonly wsOrdersConnecting: typeof wsOrdersConnecting;
  readonly wsOrdersOpen: typeof wsOrdersOpen;
  readonly wsOrdersClose: typeof wsOrdersClose;
  readonly wsOrdersMessage: typeof wsOrdersMessage;
  readonly wsOrdersError: typeof wsOrdersError;
  readonly payload?: any;
};

export const socketMiddleware = (wsActions: CheckActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next: any) => (action: CheckActions) => {
      const { dispatch } = store;
      const { type } = action;
      const {
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
      } = wsActions;

      if (type === wsFeedConnect.type) {
        // объект класса WebSocket
        socket = new WebSocket(action.payload);
        dispatch(wsFeedConnecting());
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = () => {
          dispatch(wsFeedOpen());
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event: any) => {
          dispatch(wsFeedError(event.message));
        };

        // функция, которая вызывается при получении события от сервера
        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const feedInfo = JSON.parse(data);
          dispatch(wsFeedMessage(feedInfo));
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = () => {
          dispatch(wsFeedClose());
        };

        if (type === wsFeedDisconnect.type) {
          socket.close(1000, "closePage");
          socket = null;
          dispatch(wsFeedClose());
        }
      }
      if (type === wsOrdersConnect.type) {
        // объект класса WebSocket
        socket = new WebSocket(action.payload);
        dispatch(wsOrdersConnecting());
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = () => {
          dispatch(wsOrdersOpen());
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event: any) => {
          dispatch(wsOrdersError(event.message));
        };

        // функция, которая вызывается при получении события от сервера
        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const ordersInfo = JSON.parse(data);
          dispatch(wsOrdersMessage(ordersInfo));
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = () => {
          dispatch(wsOrdersClose());
        };

        if (type === wsOrdersDisconnect.type) {
          socket.close(1000, "closePage");
          socket = null;
          dispatch(wsOrdersClose());
        }
      }
      next(action);
    };
  };
};
