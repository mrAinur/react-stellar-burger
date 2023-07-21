export const ordersSocketMiddleware = wsActions => {
  return store => {
    let socket = null;

    return next => action => {
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
        socket.onerror = event => {
          dispatch(wsOrdersError(event.message));
        };

        // функция, которая вызывается при получении события от сервера
        socket.onmessage = event => {
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

        // В проекте не используется, возможная заготовка для маштабирования
        // if (wsFeedSendMessage && type === wsFeedSendMessage.type) {
        //     // функция для отправки сообщения на сервер
        //     socket.send(JSON.stringify(action.payloud));
        // }
      }

      next(action);
    };
  };
};
