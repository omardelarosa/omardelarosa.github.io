import React, { Component } from 'react';
import IconSVG from '../components/IconSVG';
import store from '../state/store';

class SocialLinksContainer extends Component {
  makeSocialLinks(items = []) {
    return items
      .map((i, idx) => {
        return (
          <li
            key={ `social-links__list--item_${idx}` }
            className='social-links__list--item k-col k-c-4'>
            <a
              alt={i.text}
              href={i.href}
              target='_blank'
              >
              <IconSVG iconName={i.icon} />
            </a>
          </li>
        );
      });
  }

  render() {
    const socialLinksItems = store.get('homepage.links', []);
    return (
      <ul className='social-links__list k-wrap'>
        { this.makeSocialLinks(socialLinksItems) }
      </ul>
    );
  }
}

export default SocialLinksContainer;
