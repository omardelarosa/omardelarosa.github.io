/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackBaseConfig = require('./base.webpack.config.js');
const htmlPluginConfig = require('../config/html-plugin').prod;
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = {
  ...webpackBaseConfig,
  plugins: [
    ...webpackBaseConfig.plugins,
    new HtmlWebpackPlugin(htmlPluginConfig),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      // Allows debugging prod builds locally with source maps
      sourceMap: NODE_ENV === 'development'
    })
  ]
};
