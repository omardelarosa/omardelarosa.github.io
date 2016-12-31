#!/usr/bin/env node

require('babel-register');

const argv = require('yargs').argv;

const Posts = require('./utils/posts');

const posts = new Posts();

const post = posts.createPostAndWriteToDisk(argv);
