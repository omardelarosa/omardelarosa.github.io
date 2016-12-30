const SITE_HEADING_TEXT = require('./constants').SITE_HEADING_TEXT;

module.exports = {
  LINKS: [
    {
      text: `${SITE_HEADING_TEXT.toLowerCase().replace(/\s+/g, '')}`,
      href: '/'
    },
    {
      text: '~/',
      href: '/'
    },
    {
      text: 'posts/',
      href: '/posts/',
      icon: 'posts.svg',
    },
    {
      text: 'code/',
      href: '/pages/code.html',
      icon: 'code.svg',
    },
    {
      text: 'bio/',
      href: '/pages/bio.html',
      icon: 'bio.svg',
    },
    {
      text: 'contact/',
      href: '/pages/contact.html',
      icon: 'contact.svg',
    }
  ]
};
