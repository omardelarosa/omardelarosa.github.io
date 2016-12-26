require('./styles/main.styl');

const React = require('react');
const ReactDOM = require('react-dom');
const MainContainer = require('./containers/MainContainer');

ReactDOM.render(
  <MainContainer/>, 
  document.getElementById('root')
);
