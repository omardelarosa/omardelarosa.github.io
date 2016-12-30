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
        href: '/',
        icon: 'home'
      },
      {
        text: 'about/',
        href: '/pages/about.html',
        icon: 'bio',
      },
      {
        text: 'links/',
        href: '/pages/about.html',
        icon: 'bio',
      },
      {
        text: 'posts/',
        href: '/posts/',
        icon: 'bio',
      },
      {
        text: 'code/',
        href: '/pages/about.html',
        icon: 'bio',
      }
    ]
  },
};
