const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./dev.webpack.config.js');

const PORT = 8085;

config.entry.app.unshift(`webpack-dev-server/client?http://localhost:${PORT}/`);

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
  stats: { colors: true, chunks: false },
  inline: true,
  hot: true,
  publicPath: `http://localhost:${PORT}/dist/`,
});

server.listen(8085);
