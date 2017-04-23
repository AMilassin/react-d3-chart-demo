/*
 * Line Chart using d3
 *
 * @flow
 */
import React from 'react';
import * as d3 from 'd3';
import { scaleLinear } from 'd3-scale';

import MinMaxLineBar from './MinMaxLineBar';
import Axis from './Axis';



export default class LineChart extends React.Component {

  _renderLine(lineData, index, yscale, xscale) {
    if (!lineData) {
      return;
    }

    const width = 20;
    return (
      <MinMaxLineBar
        scale={ yscale }
        key={ lineData.year }
        average={ yscale(lineData.average) }
        averageValue={ lineData.average }
        min={ yscale(lineData.min) }
        max={ yscale(lineData.max) }
        position={ xscale(lineData.year) + (width / 2) }
        width={ width }
      />
    );
  }

  render() {
    const dataset = this.props.dataset;
    const years = dataset.data.map((line) => line.year);

    const yscale = scaleLinear()
                    .domain([150, 0])   // TODO should be based on property
                    .range([0, this.props.height]);
    const xscale = scaleLinear()
                    .domain([d3.min(years) - 1, d3.max(years) + 1])
                    .range([0, this.props.width])

    return (
      <svg width={ this.props.width } height={ this.props.height }>
        { /* X-Axis: years */ }
        <Axis
          data={ years }
          length={ this.props.width }
          position={ this.props.height }
          padding={ 30 }
          orient="bottom"
          scale={ xscale }/>

        { /* Y-Axis: values */ }
        <Axis
          length={ this.props.height }
          gridWidth={ this.props.width }
          position={ 0 }
          padding={ 30 }
          scale={ yscale }
          orient="left" />

        { dataset.data.map((line, index) => this._renderLine(line, index, yscale, xscale)) }
      </svg>
    );
  }

}