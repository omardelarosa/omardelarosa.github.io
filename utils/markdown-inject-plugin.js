/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const marked = require('meta-marked');
const fs = require('fs');
const slugify = require('slug');

const getAbsoluteMdPath = (mdPath) => path.join(__dirname, '..', mdPath);
// TODO: figure out slug uniquness
const generateSlug = (post) => slugify(`${post.meta.timestamp}-${post.meta.title}`);
const generatePermalink = (post) => `_blog/${post.meta.timestamp}-${post.meta.slug}.html`;

const normalizeMDContent = ({ meta, html, markdown }) => {
  const post = {
    meta: {
      title: 'Untitled Post',
      author: 'Anonymous',
      timestamp: Date.now(),
      ...meta,
    },
    html,
    markdown
  };

  // Generate slug if there isn't one
  if (!post.meta.slug) {
    post.meta.slug = generateSlug(post);
  }

  // Attaches Permalink to Post data
  post.meta.permalink = generatePermalink(post);

  return post;
};

const loadMDContent = (mdPath) => {
  let postContent;
  const fullMarkdownPath = getAbsoluteMdPath(mdPath);
  if (fullMarkdownPath) {
    let markdownRaw;
    try {
      markdownRaw = fs.readFileSync(fullMarkdownPath);
      postContent = normalizeMDContent(marked(markdownRaw.toString()));
    } catch (err) {
      console.error(err.message);
      console.error(err.stack);
      console.error(`Unable to read markdown file at ${fullMarkdownPath}`);
    }
  }
  return postContent;
};

module.exports = {
  getAbsoluteMdPath,
  loadMDContent,
  normalizeMDContent
};
