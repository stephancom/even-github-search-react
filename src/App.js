import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Container, Button, Row, Col } from 'reactstrap';
import SiteNav from './containers/SiteNav';
import Search from './containers/Search';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SiteNav></SiteNav>
        <Container>
          <Row>
            <Col>
              <h1 className="heading">Even Financial GitHub Repository Search</h1>
            </Col>
          </Row>
          <Search></Search>
        </Container>
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
