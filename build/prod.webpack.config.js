/* eslint-disable import/no-extraneous-dependencies */
const webpackBaseConfig = require('./base.webpack.config.js');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = {
  ...webpackBaseConfig,
  plugins: [
    ...webpackBaseConfig.plugins,
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};
