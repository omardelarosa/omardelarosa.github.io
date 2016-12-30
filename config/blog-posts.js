/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const constants = require('../config/constants');
const _ = require('lodash');
const Posts = require('../utils/posts');
const postUtils = new Posts();

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
  template: 'pug?pretty!templates/_post.pug',
});

const posts = postUtils.loadAllPosts();

const postConfigs = posts.map(
  (post) => ({
    ...buildConfigForPost(post),
    post
  })
);

const recentPosts = _.take(posts, 10);

const blogIndexConfig = {
  ...baseConfig,
  title: 'posts // omardelarosa.com',
  filename: path.join(__dirname, '..', 'posts/index.html'),
  template: 'pug?pretty!templates/blog.pug',
  posts: recentPosts
};

module.exports = [
  blogIndexConfig,
  ...postConfigs
];
