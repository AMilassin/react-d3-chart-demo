import React, { Component } from 'react';

import OPECORBChart from './components/chart/OPECORBChart';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>OPEC Reference Basket - Average Oil Prices</h1>
        <OPECORBChart />
      </div>
    );
  }
}

export default App;
