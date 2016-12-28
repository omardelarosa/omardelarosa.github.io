/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const constants = require('../config/constants');

module.exports = {
  entry: {
    app: [ './src/main.js' ],
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' },
      { test: /\.styl$/, loader: 'style!css!stylus' }
    ]
  },
  externals: {
    'React': 'react'
  },
  plugins: []
};
