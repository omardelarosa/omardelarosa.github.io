// TODO: replace this with redux
import _get from 'lodash/get';
import { SITE_HEADING_TEXT } from '../../config/constants';
import { LINKS, HOMEPAGE_SOCIALS } from '../../config/navigation';

export default {
  // Safe getter
  get(path, defaultValue) {
    return _get(this, path, defaultValue);
  },
  siteTitle: SITE_HEADING_TEXT,
  subTitle: 'Engineer / Musician / Etc',
  description: 'The personal website of Omar Delarosa',
  navBar: {
    links: LINKS
  },
  homepage: {
    links: HOMEPAGE_SOCIALS
  }
};
