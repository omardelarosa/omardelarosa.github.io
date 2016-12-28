const path = require('path');
const constants = require('./constants');

const baseConfig = {
  title: constants.SITE_TITLE,
  filename: path.join(__dirname, '..', 'index.html'),
  template: 'pug!templates/main.pug',
  inject: true,
  hash: false,
  cache: false
};

module.exports = {
  development: {
    ...baseConfig
    // Add custom options here
  },
  production: {
    ...baseConfig
    // Add custom options here
  }
};
