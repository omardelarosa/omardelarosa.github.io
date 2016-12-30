import React, { Component } from 'react';
import FingerPointer from './FingerPointer';

class Links extends Component {
  makeLinkElements() {
    const { props: { selectedIndex, items }} = this;
    return items.map((link, index) => (
      <li
        key={ `nav-item-${index}` }
        className={ `links__nav-item${link.icon ? ' icon-' + link.icon : ''}` }
        >
        {
          !link.href
          ? link.text
          : <a
              className='links__nav-item--anchor'
              href={link.href}
              target={ link.newWindow ? '_blank' : undefined }
              >{ link.text }</a>
        }
      </li>
    ));
  }

  render() {
    const items = this.props.items;
    return (
      <div className='links__container'>
        <ul className='links'>
          { this.makeLinkElements() }
        </ul>
      </div>
    );
  }
}

Links.defaultProps = {
  items: [],
  selectedIndex: 0
};

export default Links;
