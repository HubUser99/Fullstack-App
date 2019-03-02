import React, { Component } from 'react';

import history from '../tools/history.js';
import { Router } from 'react-router-dom';

import Container from './Container.js';
import Menu from './Menu.js';
import Footer from './Footer.js';

import '../style/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={ history }>
          <div>
            <Menu />
            <Container />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
