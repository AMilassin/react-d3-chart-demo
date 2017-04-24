/*
 * Line Chart using d3
 *
 * @flow
 */
import React from 'react';

import './MinMaxLineBar.css';



export default class MinMaxLineBar extends React.Component {

  render() {
    const { average, min, max, width, position, averageValue } = this.props;

    return (
      <g className="bar" transform={ `translate(${position}, 0)` }>
        <rect width={ width } height={ min - max } y={ max }></rect>
        <line className="averageLine" x1="0" y1={ average } x2={ 2 } y2={ average } />
        <text className="averageLabel" textAnchor="middle" x={ width / 2 } y={ average + 4 }>{ averageValue.toFixed(0) }</text>
      </g>
    );
  }

}
