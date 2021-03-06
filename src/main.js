import 'isomorphic-fetch';

import React from 'react';
import ReactDOM from 'react-dom';

import './styles/main.styl';

import HeaderContainer from './containers/HeaderContainer';
import BackgroundContainer from './containers/BackgroundContainer';
import SocialLinksContainer from './containers/SocialLinksContainer';

require('es6-promise').polyfill();

// Render Background Container
ReactDOM.render(
  <BackgroundContainer />,
  document.getElementById('background-container')
);

// Render HeaderContainer for nav, etc
ReactDOM.render(
  <HeaderContainer />,
  document.getElementById('header-container')
);

const socialLinksEl = document.querySelectorAll('.social-links__container')[0];

if (socialLinksEl) {
  ReactDOM.render(
    <SocialLinksContainer />,
    socialLinksEl
  );
}
