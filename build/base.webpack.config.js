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
        loader: 'file?name=dist/static/[name].[ext]'
      }
    ]
  },
  externals: {
    'React': 'react'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: constants.SITE_TITLE,
      filename: path.join(__dirname, '..', 'index.html'),
      template: 'pug!templates/main.pug',
      inject: true,
      hash: false,
      cache: false
    })
  ]
};
