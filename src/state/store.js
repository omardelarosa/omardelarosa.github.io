// TODO: replace this with redux
import _get from 'lodash/get';
import {
  SITE_HEADING_TEXT,
} from '../../config/constants';

export default {
  // Safe getter
  get(path, defaultValue) {
    return _get(this, path, defaultValue);
  },
  siteTitle: SITE_HEADING_TEXT,
  subTitle: 'Engineer / Musician / Etc',
  description: 'The personal website of Omar Delarosa',
  navBar: {
    links: [
      {
        text: `${SITE_HEADING_TEXT.toLowerCase().replace(/\s+/g, '')}: `
      },
      {
        text: '~/',
        href: '/'
      },
      {
        text: 'info/',
        href: '/pages/about.html',
        icon: 'bio.svg',
      },
      {
        text: 'contact/',
        href: '/pages/about.html',
        icon: 'contact.svg',
      },
      {
        text: 'posts/',
        href: '/posts/',
        icon: 'posts.svg',
      },
      {
        text: 'code/',
        href: '/pages/about.html',
        icon: 'code.svg',
      }
    ]
  },
};
