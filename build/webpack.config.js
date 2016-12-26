const path = require('path');

module.exports = {
  entry: {
    app: [ './src/main.js' ],
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },
  devServer: { inline: true },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' },
      { test: /\.styl$/, loader: 'style!css!stylus' },
    ]
  },
  externals: {
    "React": "react"
  }
}
