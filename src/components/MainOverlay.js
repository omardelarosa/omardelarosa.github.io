import React, { Component } from 'react';
import NavBar from '../containers/NavBar';

class MainOverlay extends Component {
  render() {
    const siteTitle = this.props.siteTitle;

    return (
      <div className='main-overlay'>
        <div className='title-container'>
          <div className='pusher'></div>
          <h1 className='heading'>{ siteTitle }</h1>
        </div>
        <NavBar />
      </div>
    );
  }
}

export default MainOverlay;
