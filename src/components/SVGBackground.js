import times from 'lodash/times';
import random from 'lodash/random';
import sample from 'lodash/sample';
import React, { Component } from 'react';

const getRGBColor = (rowNum, colNum, isDark = true) => {
  return isDark
    ? `rgb(255, ${rowNum * 1},${colNum * 2})`
    : `rgb(${rowNum * 2},${colNum * 1},255`;
};

const shouldRenderBox = (rowNum, colNum, rows, cols) => {
  const pictureFunction = [
    // Draw peaks and valleys
    (rowNum, colNum) => {
      const colMaxes = times(cols, (n) => random(Math.floor(rows / 4), rows - Math.floor(rows / 4)));
      return rowNum <= colMaxes[colNum];
    },

    // Leave n% empty squares
    (rowNum, colNum) => {
      return random(1, 100) >= 75;
    }
  ];

  return sample(pictureFunction)(rowNum, colNum);
};

class SVGBackground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: []
    };
  }

  generateBoxes(elWidth, elHeight) {
    const strokeWidth = 1;
    const boxWidth = 10;
    const boxHeight = 10;
    const calcNumRows = (height) => Math.floor(height / (boxHeight + (2 * strokeWidth))) + 1;
    const calcNumCols = (width) => Math.floor(width / (boxWidth + (2 * strokeWidth))) + 3;

    const rows = calcNumRows(elHeight);
    const cols = calcNumCols(elWidth);
    const calcAdjustedWidth = (cols) => (cols * boxWidth) + (cols * strokeWidth * 2);
    const calcAdjustedHeight = (rows) => (rows * boxHeight) + (rows * strokeWidth * 2);
    const adjustedWidth = calcAdjustedWidth(cols);
    const adjustedHeight = calcAdjustedHeight(rows);
    const boxes = [];
    const radiusY = 0;
    const radiusX = 0;
    return times(
      rows,
      (rowNum) => times(
        cols,
        (colNum) => {
          if (!shouldRenderBox(rowNum, colNum, rows, cols)) return null;
          return (
             <rect
              key={ 'box_' + rowNum + '_' + colNum }
              width={ boxWidth}
              height={ boxHeight }
              ry={ radiusY }
              rx={ radiusX }
              x={ calcAdjustedWidth(colNum - 1) }
              y={ calcAdjustedHeight(rowNum - 1) }
              style={{ strokeWidth, fill: getRGBColor(rowNum, colNum) }}
              />
          );
        }
      )
    ).filter(b => !!b);
  }

  render () {
    const { elWidth, elHeight } = this.props;
    const boxes = this.generateBoxes(elWidth, elHeight);
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
