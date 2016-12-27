import React, { Component } from 'react';

const pointerSVGPath = '/assets/images/hand-pointer-2.svg';

class FingerPointer extends Component {
  render() {
    return (
      <img
        className='nav-item--finger-pointer'
        src={ pointerSVGPath } />
    );
  }
}

export default FingerPointer;
