const path = require('path');
const constants = require('./constants');
const routes = require('./routes');

const baseConfig = {
  title: constants.SITE_TITLE,
  filename: path.join(__dirname, '..', 'index.html'),
  template: 'pug?pretty!templates/main.pug',
  inject: true,
  hash: false,
  cache: true,
  chunks: [ 'app' ],
};

module.exports = [
  ...routes.map(
    (route) => ({
      ...baseConfig,
      title: `${route.title.toLowerCase()} // omardelarosa.com`,
      filename: path.join(__dirname, '..', route.path),
      template: `pug?pretty!templates/${route.template}`,
      chunks: [ ...baseConfig.chunks, ...(route.chunks || [])]
    })
  )
];
