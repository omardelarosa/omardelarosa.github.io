// TODO: replace this with redux
import _get from 'lodash/get';
import constants from '../../config/constants';

export default {
  // Safe getter
  get(path, defaultValue) {
    return _get(this, path, defaultValue);
  },
  siteTitle: constants.SITE_HEADING_TEXT,
  subTitle: 'Engineer / Musician / Etc',
  description: 'The personal website of Omar Delarosa',
  navBar: {
    links: [
      {
        text: 'Home',
        href: '/',
        icon: 'home',
      },
      {
        text: 'About',
        href: '/pages/about.html',
        icon: 'bio',
      },
      {
        text: 'Links',
        href: '/pages/about.html',
        icon: 'bio',
      },
      {
        text: 'Posts',
        href: '/posts/',
        icon: 'bio',
      },
      {
        text: 'Code',
        href: '/pages/about.html',
        icon: 'bio',
      }
    ]
  },
};
