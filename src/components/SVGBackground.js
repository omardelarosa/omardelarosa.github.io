import _ from 'lodash';
import { default as React, Component } from 'react';

const getRGBColor = (rowNum, colNum) => {
  return `rgb(${rowNum * 2},${colNum * 2},${255})`;
};

const shouldRenderBox = () => _.random(0,100) >= 50; 

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
    const calcNumRows = (height) => Math.floor(height / ( boxHeight + (2 * strokeWidth) ));
    const calcNumCols = (width) => Math.floor(width / ( boxWidth + (2 * strokeWidth) ));

    const rows = this.props.rows || calcNumRows(elHeight);
    const cols = this.props.cols || calcNumCols(elWidth);
    const calcAdjustedWidth = (cols) => (cols * boxWidth) + (cols * strokeWidth * 2);
    const calcAdjustedHeight = (rows) => (rows * boxHeight) + (rows * strokeWidth * 2);
    const adjustedWidth = calcAdjustedWidth(cols);
    const adjustedHeight = calcAdjustedHeight(rows);
    const boxes = [];
    _.times(
      rows, 
      (rowNum) => _.times(
        cols,
        (colNum) => {
          // if (!shouldRenderBox()) return; 
          boxes.push(
             <rect 
              key={ 'box_' + rowNum + '_' + colNum }
              width={ boxWidth} 
              height={ boxHeight }
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
        className='main-grid'
        width={ adjustedWidth }
        height={ adjustedHeight }
        viewBox={ '0 0 ' + adjustedWidth + ' ' + adjustedHeight }
        xmlns='http://www.w3.org/2000/svg'
        >
          { boxes }
        </svg>
    );
  }
}

export default SVGBackground;
