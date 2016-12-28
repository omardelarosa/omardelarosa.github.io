import React from 'react';
import ReactDOM from 'react-dom';

import './styles/main.styl';

import HeaderContainer from './containers/HeadingContainer';
import BackgroundContainer from './containers/BackgroundContainer';

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
