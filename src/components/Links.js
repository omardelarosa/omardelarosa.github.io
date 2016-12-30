import React, { Component } from 'react';
import IconSVG from './IconSVG';

class Links extends Component {
  makeIconElement(link) {
    return <IconSVG
      iconName={ link.icon }
    />;
  }

  makeLinkElements() {
    const { props: { selectedIndex, items }} = this;
    return items.map((link, index) => (
      <li
        key={ `nav-item-${index}` }
        className={ 'links__nav-item' }
        >
      <a
        className='links__nav-item--anchor'
        href={link.href}
        target={ link.newWindow ? '_blank' : undefined }
        >
          <span
            className={ `links__nav-item--anchor--text${!link.icon ? ' no-icon' : ''}` }
            >{ link.text }</span>
          { link.icon && this.makeIconElement(link) }
        </a>
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
