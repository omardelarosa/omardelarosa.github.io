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
        text: 'About',
        href: '#bio',
        icon: 'bio',
        noNewWindow: true
      },
      {
        text: 'LinkedIn',
        href: 'https://www.linkedin.com/in/omardelarosa',
        icon: 'linkedin',
      },
      {
        text: 'Github',
        href: 'http://github.com/omardelarosa',
        icon: 'github',
      },
      {
        text: 'Instagram',
        href: 'http://instagram.com/omdel',
        icon: 'instagram',
      },
      {
        text: 'Blog',
        href: 'http://blog.omardelarosa.com',
        icon: 'blogger',
      },
      {
        text: 'Music',
        href: 'http://littleinsects.com',
        icon: 'music'
      }
    ]
  },
  bio: {
    en: 'Bio coming soon...',
    es: 'Biene pronto...'
  }
};
