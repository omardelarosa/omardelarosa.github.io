/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const express = require('express');

const app = express();

// Bind WebSocket capabilities to express
const expressWss = require('express-ws')(app);
const serverConf = require('../config/server');

const { PORT, WEBPACK_SOCKET_PATH } = serverConf;

app.use('/', express.static(path.join(__dirname, '..')));

const aWss = expressWss.getWss(WEBPACK_SOCKET_PATH);

app.ws(WEBPACK_SOCKET_PATH, (ws, req) => {
  ws.on('message', (msg) => {
    // Broadcast message
    aWss.clients.forEach((client) => {
      client.send(msg);
    });
  });
});

app.listen(PORT, (err) => {
  if (err) return console.error(err);
  return console.log(`Express is running on ${PORT}`);
});
