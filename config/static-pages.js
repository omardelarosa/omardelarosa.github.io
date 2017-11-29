const path = require('path');
const constants = require('./constants');
const routes = require('./routes');
const mdUtils = require('../utils/markdown');
const fs = require('fs');

const PAGE_MARKDOWN_PATH = path.join(__dirname, '../_pages');

const PAGE_OUTPUT_PATH = path.join(__dirname, '../pages');

const loadMarkdownPage = (mdFilename) => {
  const mdPath = path.join(
    PAGE_MARKDOWN_PATH, mdFilename
  );
  const mdBuffer = fs.readFileSync(mdPath);
  return mdBuffer.toString();
}

const generateTemplateLoaderString = (templateName) => `pug?pretty!templates/${templateName}`

const getGenericDescription = (route) => {
  return `${route.title.toLowerCase()} page | omardelarosa.com`;
}

const baseConfig = {
  title: constants.SITE_TITLE,
  filename: path.join(PAGE_OUTPUT_PATH, 'index.html'),
  template: 'pug?pretty!templates/index.pug',
  inject: true,
  hash: false,
  cache: true,
  chunks: [ 'app' ]
};

module.exports = [
  ...routes.map(
    (route) => {
      let md;
      let template;
      let title;
      let og = {};
      if (route.markdown) {
        let mdString = loadMarkdownPage(route.markdown);
        md = mdUtils.parseMarkdown(mdString);
        if (!md.meta.slug) {
          md.meta.slug = route.slug;
        }

        if (md.meta.ogDescription) {
          og.description = md.meta.ogDescription;
        } else {
          og.description = getGenericDescription(route);
        }

        if (!md.meta.slug) {
          throw new Error(`No slug available for page '${route.title}'`);
        }
      }

      if (md) {
        template = generateTemplateLoaderString('_page.pug');
        title = md.meta.title;
      } else {
        template = generateTemplateLoaderString(route.template);
        title = route.title;
        md = {
          meta: {
            slug: 'index'
          }
        }
      }

      return {
        ...baseConfig,
        title: `${title.toLowerCase()} | omardelarosa.com`,
        filename: path.join(PAGE_OUTPUT_PATH, `${route.slug}.html`),
        template,
        chunks: [ ...baseConfig.chunks, ...(route.chunks || [])],
        md,
        og
      }
    }
  )
];
