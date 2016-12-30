import React, { Component } from 'react';
import store from '../state/store';
import Links from '../components/Links';

class HeadingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLinkIndex: 0
    };
  }

  render() {
    const { state: { selectedLinkIndex }} = this;
    const links = store.get('navBar.links', []);
    const siteTitle = store.get('siteTitle', '');

    return <Links
      siteTitle={ siteTitle }
      items={ links }
      selectedIndex={ selectedLinkIndex } />;
  }
}

HeadingContainer.defaultProps = {
  links: []
};

export default HeadingContainer;
