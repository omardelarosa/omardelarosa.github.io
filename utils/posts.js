/* eslint-disable no-underscore-dangle */
const path = require('path');
const glob = require('glob-fs')({ gitignore: true });
const _ = require('lodash');
const slugify = require('slug');
const fs = require('fs');
const clc = require('cli-color');
const markdown = require('./markdown');
const timeUtils = require('./time');
const POSTS_PATH = '_posts/';
const FULL_POSTS_PATH = path.join(__dirname, '..', POSTS_PATH);
const slugInFileRE = new RegExp(`${POSTS_PATH}\\d+_([\\w-]+)\\.md`);
const DEFAULT_AUTHOR = 'omardelarosa';
const DEFAULT_AUTHOR_URL = '/pages/bio.html';
const DEFAULT_TITLE = 'Untitled Post';
const DEFAULT_BODY = 'Begin writing here..';
const DEFAULT_OG_DESCRIPTION = 'an article about life, technology and/or music by omar delarosa';
const uuid = () => Date.now().toString('16');

class Posts {
  constructor(opts = {}) {
    this.init();
  }

  init() {
    // Get all file names of POSTS
    this.fileNames = glob.readdirSync(`./${POSTS_PATH}**/*.md`);
    this.slugs = this.fileNames
      .map(fileName => fileName.match(slugInFileRE))
      .filter(m => !!m)
      .map(m => m[1]);
  }

  get absoluteFilePaths () {
    return this.fileNames.map((f) => {
      return path.join('..', f)
    });
  }

  loadAllPosts(force = false) {
    if (this.__allPosts && !force) {
      return this.__allPosts;
    }

    // Load and cache all posts
    this.__allPosts = this.absoluteFilePaths
      .map(this.loadPost.bind(this));

    return this.__allPosts;
  }

  get allPosts() {
    if (this.__allPosts) {
      return this.__allPosts;
    } else {
      return this.loadAllPosts();
    }
  }

  generatePostIndex() {
    return this.allPosts;
  }

  generateSlug(slug, title) {
    // If no slug is provided, slugify the title
    if (!slug) {
      slug = slugify(title.toLowerCase());
    }

    // If slug already exists, add a hash to the end.
    if (_.includes(this.slugs, slug)) {
      slug += `-${uuid()}`;
    }

    return slug;
  }

  loadPost(postMarkdownFilepath) {
    const rawMarkdown = fs.readFileSync(postMarkdownFilepath);
    const post = this.normalizeMarkdownImport(markdown.parseMarkdown(rawMarkdown));
    return post;
  }

  createPost(opts = {}) {
    const title = opts.title || DEFAULT_TITLE;
    const author = opts.author || DEFAULT_AUTHOR;
    const timestamp = opts.timestamp || Date.now();
    const slug = this.generateSlug(opts.slug, title);
    const datestring = timeUtils.formatTimestamp(timestamp);
    const body = opts.body || DEFAULT_BODY;

    const fileString = [
      '---\n',
      `title:   ${title}\n`,
      `author:  ${author}\n`,
      `timestamp: ${timestamp}\n`,
      `created_at: ${timestamp}\n`,
      `published_at: ${timestamp}\n`,
      `slug:    ${slug}\n`,
      `ogDescription: ${DEFAULT_OG_DESCRIPTION}\n`,
      '---\n',
      `${body}\n`,
    ].join('');
    const fileName = `${timestamp}_${slug}.md`;
    const fullFilePath = path.join(__dirname, `../${POSTS_PATH}`, fileName);

    return {
      title,
      author,
      timestamp,
      created_at,
      published_at,
      slug,
      body,
      file: {
        string: fileString,
        path: fullFilePath,
        name: fileName
      }
    };
  }

  generatePermalinkOfPost(post) {
    return `posts/${post.meta.slug}.html`;
  }

  createPostAndWriteToDisk(opts = {}) {
    const post = this.createPost(opts);
    fs.writeFileSync(post.file.path, post.file.string);

    console.log(clc.green.bold('Successfully created new post file: '));
    console.log(clc.cyan(post.file.path));
    console.log(clc.green(post.file.string));
  }

  normalizeMarkdownImport({ meta, html, markdown }) {
    const timestamp = Date.now();
    const post = {
      meta: {
        title: 'Untitled Post',
        author: 'Anonymous',
        timestamp,
        ...meta,
        created_at: meta.created_at || meta.timestamp || timestamp,
        published_at: meta.published_at || meta.timestamp || timestamp,
      },
      html,
      markdown
    };

    // Generate slug if there isn't one
    if (!post.meta.slug) {
      post.meta.slug = this.generateSlug(null, post.meta.title);
    }

    // Attaches Permalink to Post data
    post.meta.permalink = this.generatePermalinkOfPost(post);

    // Attaches a formatted datestring for displaying publication date
    post.meta.datestring = timeUtils.formatTimestamp(post.meta.published_at, 'post');

    // TODO: make this dynamic
    post.meta.author_url = DEFAULT_AUTHOR_URL;
    post.og = {
      description: post.meta.ogDescription || DEFAULT_OG_DESCRIPTION
    };
    return post;
  }

  static postsPath() {
    return POSTS_PATH;
  }
}

Posts.POSTS_PATH = POSTS_PATH;
Posts.FULL_POSTS_PATH = FULL_POSTS_PATH;

module.exports = Posts;
