/*
 * Line Chart using d3
 *
 * @flow
 */
import React from 'react';
import * as d3 from 'd3';
import { axisBottom, axisLeft } from 'd3-axis';

import './Axis.css';



export default class XAxis extends React.Component {

  componentDidUpdate() {
    this._renderAxis();
  }

  componentDidMount() {
    this._renderAxis();
  }

  _renderAxis() {
    const scale = this.props.scale;

    let axis;
    if (this.props.orient === 'bottom') {
      axis = axisBottom();
    } else if (this.props.orient === 'left') {
      axis = axisLeft();
    }

    axis.scale(scale)
        .tickSize(0)                  // no ticks on the side
        .tickSizeOuter(0)
        .ticks(10, "f")               // label formatting: no delimiters, just the number
        .tickFormat((d) => {
          if (d === 0) {               // hide "0"   trick :D
            return "";
          }
          return d;
        });

    if (this.props.gridWidth) {
      axis.tickSizeInner(-this.props.gridWidth);
    }

    if (this.props.data) {
      axis.tickValues(this.props.data);
    }

    let node = this.refs.axis;
    d3.select(node).call(axis);
  }


  render() {
    let transform;
    if (this.props.orient === 'bottom') {
      //transform = `translate(0, ${ this.props.position - this.props.padding })`;
      transform = `translate(${ this.props.padding }, ${ this.props.position - this.props.padding })`;
    } else if (this.props.orient === 'left') {
      transform = `translate(${ this.props.padding }, 0)`;
    }

    return (
      <g className="axis" ref="axis" x="100" transform={ transform }></g>
    );
  }

}
