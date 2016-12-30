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
  ],
  HOMEPAGE_SOCIALS: [
    {
      text: 'LinkedIn',
      href: 'https://www.linkedin.com/omardelarosa',
      icon: 'linkedin-logo.svg'
    },
    {
      text: 'Github',
      href: 'https://github.com/omardelarosa',
      icon: 'github-logo.svg'
    },
    {
      text: 'Instagram',
      href: 'http://instagram.com/omdel',
      icon: 'ig-logo.svg'
    },
    {
      text: 'Tumblr',
      href: 'http://omardelarosa.tumblr.com',
      icon: 'tumblr-logo.svg'
    }
  ]
};
