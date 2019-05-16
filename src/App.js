import React, { Component } from 'react';
import './App.css';
import ToolbarView from './ToolbarView'
import FoodsView from './FoodsView'
import { Router} from "@reach/router"
import LoginView from './LoginView';

class App extends Component {
  render() {
    return (
      <div className="App">
      <ToolbarView />
      <Router>
        <LoginView path="login" />
        <FoodsView path="foods" />
      </Router>
      </div>
    )
  }
}

export default App
