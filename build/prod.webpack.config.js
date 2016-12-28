/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackBaseConfig = require('./base.webpack.config.js');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'production';
const htmlPluginConfig = require('../config/html-plugin')[NODE_ENV];

module.exports = {
  ...webpackBaseConfig,
  plugins: [
    new HtmlWebpackPlugin(htmlPluginConfig),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};
