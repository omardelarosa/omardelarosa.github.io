import React, { Component } from 'react';
import SVGBackground from '../components/SVGBackground';

class BackgroundContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elWidth: 0,
      elHeight: 0,
      resizeCallback: () => this.updateViewportSize()
    };
  }

  componentDidMount() {
    this.updateViewportSize();
    window.addEventListener('resize', this.state.resizeCallback);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.state.resizeCallback);
  }

  updateViewportSize() {
    this.setState({
      elWidth: window.innerWidth,
      elHeight: window.innerHeight
    });
  }

  render() {
    return (
      <SVGBackground elWidth={this.state.elWidth} elHeight={this.state.elHeight}/>
    );
  }
}

export default BackgroundContainer;
