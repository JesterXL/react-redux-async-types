import React, { Component } from 'react';
import './App.css';
import ToolbarView from './ToolbarView'
import FoodsView from './FoodsView'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToolbarView />
        <FoodsView />
      </div>
    )
  }
}

export default App
