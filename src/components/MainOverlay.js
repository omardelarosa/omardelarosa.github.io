import React, { Component } from 'react';

class MainOverlay extends Component {
  render() {
    const siteTitle = this.props.siteTitle;

    return (
      <div className='main-overlay'>
        <div className='title-container'>
          <div className='pusher'></div>
          <h1 className='heading'>{ siteTitle }</h1>
        </div>
        <div className='links-container'>
          <ul className='links'>
            <li className='link'>LINK 1</li>
            <li className='link'>LINK 2</li>
            <li className='link'>LINK 3</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default MainOverlay;
