import {
  wsOrdersConnect,
  wsOrdersDisconnect,
  wsOrdersConnecting,
  wsOrdersOpen,
  wsOrdersClose,
  wsOrdersMessage,
  wsOrdersError,
} from "../actions/ordersActions";

type CheckActions = {
  readonly type?:
    | typeof wsOrdersConnect.type
    | typeof wsOrdersDisconnect.type
    | typeof wsOrdersConnecting.type
    | typeof wsOrdersOpen.type
    | typeof wsOrdersClose.type
    | typeof wsOrdersMessage.type
    | typeof wsOrdersError.type;
  readonly wsOrdersConnect: typeof wsOrdersConnect;
  readonly wsOrdersDisconnect: typeof wsOrdersDisconnect;
  readonly wsOrdersConnecting: typeof wsOrdersConnecting;
  readonly wsOrdersOpen: typeof wsOrdersOpen;
  readonly wsOrdersClose: typeof wsOrdersClose;
  readonly wsOrdersMessage: typeof wsOrdersMessage;
  readonly wsOrdersError: typeof wsOrdersError;
  readonly payload?: any;
};

export const ordersSocketMiddleware = (wsActions: CheckActions) => {
  return (store: any) => {
    let socket: {
      onopen: any;
      onerror: any;
      onmessage: any;
      onclose: any;
      close: any;
    } | null = null;

    return (next: any) => (action: CheckActions) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsOrdersConnect,
        wsOrdersDisconnect,
        wsOrdersConnecting,
        wsOrdersOpen,
        wsOrdersClose,
        wsOrdersMessage,
        wsOrdersError,
      } = wsActions;

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
