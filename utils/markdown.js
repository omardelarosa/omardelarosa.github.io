const path = require('path');
const marked = require('meta-marked');
const fs = require('fs');

// Set markdown options
marked.setOptions({
  highlight(code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

const parseMarkdown = (mdString = '') => {
  return marked(mdString.toString());
};

module.exports = {
  parseMarkdown
};
