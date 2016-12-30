/* eslint-disable import/no-extraneous-dependencies */
const webpackBaseConfig = require('./base.webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const staticPages = require('../config/static-pages');

const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  ...webpackBaseConfig,
  entry: {
    ...webpackBaseConfig.entry,
    reloader: [ './src/reloader.js' ]
  },
  plugins: [
    ...webpackBaseConfig.plugins,
    // Build only static pages, not posts
    ...staticPages.map(p => {
      return new HtmlWebpackPlugin({
        ...p,
        // Add live page reloading on dev
        chunks: [ ...p.chunks, 'reloader' ]
      });
    }),
  ]
};
