/*
 *
 * @flow
 */
import React from 'react';

import LineChart from './parts/LineChart';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';



@observer
export default class OPECORBChart extends React.Component {

  @observable orbData;

  componentWillMount() {
    // simulate loading time with setTimeout
    setTimeout(() => {
      this._collectORBData()
      .then((payload) => {
        const sanitizedData = this._genInternalDatasetForOrbData(payload.dataset.data);
        this._setData(sanitizedData);
      })
    }, 1500);
  }

  _collectORBData() {
    // simulate loading
    return fetch('/ORB.json', {
      method: 'get'
    }).then((response) => {
      return response.json();
    }).catch(function(err) {
      console.error(err);
    });
  }

  _genInternalDatasetForOrbData(orbData) {
    if (!orbData) {
      return;
    }

    //
    const dataset = [];
    let minYear = Number.MAX_VALUE;
    let maxYear = Number.MIN_VALUE;

    const tenYearsBack = new Date().getFullYear() - 10;

    let sampleCount = 0;
    let currentYear = 0;
    let dataline = null;
    orbData.forEach((line) => {
      const date = new Date(Date.parse(line[0]));
      const dateYear = date.getFullYear();
      if (dateYear <= tenYearsBack) {
        return;
      }

      if (currentYear !== dateYear) {
        if (dataline != null) {
          dataline.average /= sampleCount;
        }

        sampleCount = 0;
        currentYear = dateYear;
        dataline = {
          average: 0,
          min: Number.MAX_VALUE,
          max: Number.MIN_VALUE,
          year: dateYear,
        };
        dataset.push(dataline);
      }

      if (minYear > dateYear) {
        minYear = dateYear;
      }
      if (maxYear < dateYear) {
        maxYear = dateYear;
      }

      const value = parseFloat(line[1], 10);
      dataline.average += value;
      sampleCount++;

      if (dataline.min > value) {
        dataline.min = value;
      }
      if (dataline.max < value) {
        dataline.max = value;
      }
    });

    // last year
    dataline.average /= sampleCount;

    return {
      data: dataset.reverse(),
      minYear,
      maxYear,
    };
  }

  @action _setData(orbData) {
    this.orbData = orbData;
  }

  render() {
    if (!this.orbData) {
      return <div>Loading chart...</div>;
    }

    return (
      <LineChart width={ 600 } height={ 400 } dataset={ this.orbData } />
    );
  }

}
