import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import SiteNav from './containers/SiteNav';
import Search from './containers/Search';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <SiteNav></SiteNav>
        <Container>
          <Row>
            <Col>
              <h1>Even Financial GitHub Repository Search</h1>
            </Col>
          </Row>
          <Search/>
        </Container>
      </div>
    );
  }
}
