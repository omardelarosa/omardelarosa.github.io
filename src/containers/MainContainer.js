import _ from 'lodash';
import { default as React, Component } from 'react';
import SVGBackground from '../components/SVGBackground';

class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      elWidth: 0,
      elHeight: 0
    }
  }
  
  componentDidMount() {
    const newState = {
      elWidth: window.innerWidth,
      elHeight: window.innerHeight
    };
    this.setState(newState);
  }

  render () {
    return (
      <div id='main-container'>
        <SVGBackground elWidth={this.state.elWidth} elHeight={this.state.elHeight}/>
      </div>
    );
  }
}

export default MainContainer;
