import React, { Component } from 'react';

const ICONS_BASE_PATH = '/assets/icons/';

class IconSVG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasFetched: false,
      svgString: null
    };
  }

  getIconURL(iconName) {
    return `${ICONS_BASE_PATH}${iconName}`;
  }

  componentWillMount() {
    const { props: { iconName }} = this;
    const iconUrl = this.getIconURL(iconName);
    fetch(iconUrl)
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(`Unable to load icon ${iconUrl}`);
        }
        return res.text();
      })
      .then((text) => {
        this.setState({
          svgString: text
        });
      });
  }

  createMarkup() {
    const SVGString = this.state.svgString || '';
    return {
      __html: SVGString
    };
  }

  render() {
    return (
      <span
        className='icon-svg'
        dangerouslySetInnerHTML={ this.createMarkup() }
        ></span>
    );
  }
}

export default IconSVG;
