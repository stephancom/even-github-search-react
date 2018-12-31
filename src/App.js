import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from 'reactstrap';
import SiteNav from './containers/SiteNav';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SiteNav></SiteNav>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Button 
            color='primary' 
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </Button>
        </header>
      </div>
    );
  }
}

export default App;
