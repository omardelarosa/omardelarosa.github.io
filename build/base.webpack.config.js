const path = require('path');

module.exports = {
  entry: {
    app: [ './src/main.js' ],
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },
  devServer: {
    inline: true,
    contentBase: './'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' },
      { test: /\.styl$/, loader: 'style!css!stylus' },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=dist/fonts/[name].[ext]'
      }
    ]
  },
  externals: {
    'React': 'react'
  },
  plugins: []
};
