import React, { Component } from 'react';
import store from '../state/store';
import Links from '../components/Links';

class HeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLinkIndex: 0
    };
  }

  render() {
    const { state: { selectedLinkIndex }} = this;
    const links = store.get('navBar.links', []);
    return <Links items={ links } selectedIndex={ selectedLinkIndex } />;
  }
}

HeaderContainer.defaultProps = {
  links: []
};

export default HeaderContainer;
