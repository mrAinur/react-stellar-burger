export const feedSocketMiddleware = wsActions => {
  return store => {
    let socket = null;

    return next => action => {
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
        socket.onerror = event => {
          dispatch(wsFeedError(event.message));
        };

        // функция, которая вызывается при получении события от сервера
        socket.onmessage = event => {
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
