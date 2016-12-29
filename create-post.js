#!/usr/bin/env node

const argv = require('yargs').argv;

const Posts = require('./utils/posts');

const posts = new Posts();

const post = posts.createPostAndWriteToDisk(argv);
