const serverConf = require('../config/server');

const { PORT, HOST, WEBPACK_SOCKET_PATH } = serverConf;

const exampleSocket = new WebSocket(`ws://${HOST}:${PORT}${WEBPACK_SOCKET_PATH}`, 'webpackEvents');

exampleSocket.onmessage = (event) => {
  if (event.data === 'webpack:reload') {
    window.location.reload();
  }
};
