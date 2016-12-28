/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const express = require('express');

const app = express();
const PORT = 8085;

app.use('/', express.static(path.join(__dirname, '..')));

app.listen(PORT, (err) => {
  if (err) return console.error(err);
  return console.log(`Express is running on ${PORT}`);
});
