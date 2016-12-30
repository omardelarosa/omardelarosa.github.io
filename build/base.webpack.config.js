/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const constants = require('../config/constants');

const staticPages = require('../config/static-pages');
const blogPosts = require('../config/blog-posts');
const rupture = require('rupture');

module.exports = {
  entry: {
    app: [ './src/main.js' ],
    blog: [ './src/blog.js' ]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      { test: /\.js$/, loader: 'babel' },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract(
          'style-loader', 'css-loader!stylus-loader'
        )
      }
    ]
  },
  stylus: {
    use: [
      rupture()
    ],
    import: [
      '~rupture/rupture/index.styl',
    ],
  },
  externals: {
    'React': 'react'
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    // Generate all static pages based on config/routes.js
    ...staticPages.map(p => new HtmlWebpackPlugin(p)),
    ...blogPosts.map(p => new HtmlWebpackPlugin(p)),
  ]
};
