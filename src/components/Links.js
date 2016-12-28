import React, { Component } from 'react';
import FingerPointer from './FingerPointer';

class Links extends Component {
  tryToRenderFingerPointer(index, selectedIndex) {
    return null;
    // TODO: implement conditional FingerPointer loading
    // return index === selectedIndex ? <FingerPointer /> : null;
  }

  makeLinkElements() {
    const { props: { selectedIndex, items }} = this;
    return items.map((link, index) => (
      <li
        key={ `nav-item-li-${index}` }
        className={ `link ${link.icon ? 'icon-' + link.icon : ''}` }
        >
          { this.tryToRenderFingerPointer(index, selectedIndex) }
          <a
            className='nav-item--anchor'
            href={link.href}
            target={ link.newWindow ? '_blank' : undefined }
            >{ link.text }</a>
      </li>
    ));
  }

  render() {
    const items = this.props.items;
    return (
      <div className='links-container'>
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
