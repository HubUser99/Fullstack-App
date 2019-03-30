import React, { Component } from 'react';

import history from '../tools/history.js';
import { Router } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from './Container.js';
import Menu from './Menu.js';
import Footer from './Footer.js';

import '../style/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Typography>
          <Router history={ history }>
            <div>
              <Menu />
              <Container />
              <Footer />
            </div>
          </Router>
        </Typography>
      </div>
    );
  }
}

export default App;
