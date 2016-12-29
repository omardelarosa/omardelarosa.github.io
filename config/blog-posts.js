/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const constants = require('../config/constants');
const MarkdownInjectPlugin = require('../utils/markdown-inject-plugin');
const _ = require('lodash');
const glob = require('glob-fs')({ gitignore: true });

const files = glob.readdirSync('./_posts/**/*.md');

const baseConfig = {
  inject: true,
  hash: false,
  cache: false, // TODO: figure out how to cache these
  chunks: [ 'app', 'blog' ],
};

const buildConfigForPost = ({ meta }) => ({
  ...baseConfig,
  title: `${meta.title}`,
  filename: path.join(__dirname, '..', meta.permalink),
  template: 'pug!templates/_post.pug',
});

const posts = files.map((file) => MarkdownInjectPlugin.loadMDContent(file));

const postConfigs = posts.map(
  (post) => ({
    ...buildConfigForPost(post),
    post
  })
);

const recentPosts = _.take(posts, 10);

const blogIndexConfig = {
  ...baseConfig,
  title: 'Blog',
  filename: path.join(__dirname, '..', 'posts/index.html'),
  template: 'pug!templates/blog.pug',
  posts: recentPosts
};

module.exports = [
  blogIndexConfig,
  ...postConfigs
];
