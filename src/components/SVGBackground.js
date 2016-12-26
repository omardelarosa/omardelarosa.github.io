import _ from 'lodash';
import { default as React, Component } from 'react';

const getRGBColor = (rowNum, colNum) => {
  return `rgb(255,${rowNum * 2},${colNum * 1})`;
};

const shouldRenderBox = (rowNum, colNum, rows, cols) => {

  const pictureFunction = [
    // Draw peaks and valleys
    (rowNum, colNum) => {
      const colMaxes = _.times(cols, (n) => _.random(Math.floor(rows/4), rows - Math.floor(rows/4)));
      return rowNum <= colMaxes[colNum];
    },

    // Leave n% empty squares
    (rowNum, colNum) => {
      return _.random(1,100) >= 75;
    }
  ];

  return _.sample(pictureFunction)(rowNum, colNum);
}

const peaksAndValleys = (rowNum, colNum) => {
  const colMaxes = _.times(cols, (n) => _.random(Math.floor(rows/4), rows - Math.floor(rows/4)));
}

class SVGBackground extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    // Don't calculate anything when size is 0
    if (!this.props.elWidth || !this.props.elHeight) return (<svg className='main-grid'></svg>);

    const elWidth = this.props.elWidth;
    const elHeight = this.props.elHeight;
    const strokeWidth = 1;
    const boxWidth = this.props.boxWidth || 10;
    const boxHeight = this.props.boxHeight || 10;
    const calcNumRows = (height) => Math.floor(height / ( boxHeight + (2 * strokeWidth) )) + 1;
    const calcNumCols = (width) => Math.floor(width / ( boxWidth + (2 * strokeWidth) )) + 3;

    const rows = this.props.rows || calcNumRows(elHeight);
    const cols = this.props.cols || calcNumCols(elWidth);
    const calcAdjustedWidth = (cols) => (cols * boxWidth) + (cols * strokeWidth * 2);
    const calcAdjustedHeight = (rows) => (rows * boxHeight) + (rows * strokeWidth * 2);
    const adjustedWidth = calcAdjustedWidth(cols);
    const adjustedHeight = calcAdjustedHeight(rows);
    const boxes = [];
    const radiusY = Math.floor(boxHeight / 2);
    const radiusX = Math.floor(boxWidth / 2);
    _.times(
      rows, 
      (rowNum) => _.times(
        cols,
        (colNum) => {
          if (!shouldRenderBox(rowNum, colNum, rows, cols)) return;
          boxes.push(
             <rect 
              key={ 'box_' + rowNum + '_' + colNum }
              width={ boxWidth} 
              height={ boxHeight }
              ry={ radiusY }
              rx={ radiusX }
              x={ calcAdjustedWidth(colNum - 1) }
              y={ calcAdjustedHeight(rowNum - 1) }
              style={{ strokeWidth: strokeWidth, fill: getRGBColor(rowNum, colNum) }}
              />
           )
        }
      )
    );

    return (
      <svg 
        className='svg-grid'
        width={ elWidth }
        height={ elHeight }
        viewBox={ '0 0 ' + elWidth + ' ' + elHeight }
        xmlns='http://www.w3.org/2000/svg'
        >
          { boxes }
        </svg>
    );
  }
}

export default SVGBackground;
