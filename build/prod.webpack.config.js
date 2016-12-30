/* eslint-disable import/no-extraneous-dependencies */
const webpackBaseConfig = require('./base.webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const staticPages = require('../config/static-pages');
const blogPosts = require('../config/blog-posts');

const NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = {
  ...webpackBaseConfig,
  plugins: [
    ...webpackBaseConfig.plugins,
    new webpack.optimize.OccurenceOrderPlugin(),
    // Generate all static pages based on config/routes.js
    ...staticPages.map(p => new HtmlWebpackPlugin(p)),

    // Generate all posts based on contents of _posts/
    ...blogPosts.map(p => new HtmlWebpackPlugin(p)),
  ]
};
