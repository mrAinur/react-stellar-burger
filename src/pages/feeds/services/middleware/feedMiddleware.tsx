import {
  wsFeedConnect,
  wsFeedDisconnect,
  wsFeedConnecting,
  wsFeedOpen,
  wsFeedClose,
  wsFeedMessage,
  wsFeedError,
} from "../actions/feedActions";

type CheckActions = {
  readonly type?:
    | typeof wsFeedConnect.type
    | typeof wsFeedDisconnect.type
    | typeof wsFeedConnecting.type
    | typeof wsFeedOpen.type
    | typeof wsFeedClose.type
    | typeof wsFeedMessage.type
    | typeof wsFeedError.type;
  readonly wsFeedConnect: typeof wsFeedConnect;
  readonly wsFeedDisconnect: typeof wsFeedDisconnect;
  readonly wsFeedConnecting: typeof wsFeedConnecting;
  readonly wsFeedOpen: typeof wsFeedOpen;
  readonly wsFeedClose: typeof wsFeedClose;
  readonly wsFeedMessage: typeof wsFeedMessage;
  readonly wsFeedError: typeof wsFeedError;
  readonly payload?: any;
};

export const feedSocketMiddleware = (wsActions: CheckActions) => {
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
        wsFeedConnect,
        wsFeedDisconnect,
        wsFeedConnecting,
        wsFeedOpen,
        wsFeedClose,
        wsFeedMessage,
        wsFeedError,
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
      next(action);
    };
  };
};
