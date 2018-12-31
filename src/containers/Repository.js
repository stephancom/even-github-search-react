import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import './Repository.scss';

export default class Repository extends Component {
  render() {
    return(
      <Row className="m-4 px-4 px-md-0">
        <Col className="col-md-8 col-12 border p-3">
          <Row className="pt-3">
            <Col>
              { this.props.repo.fork && <Button className="float-right" size="sm" variant="primary">Forked</Button> }
              <a href="{this.props.repo.html_url}" target="_blank">{ this.props.repo.full_name }</a>
            </Col>
          </Row>
          <Row className="pt-3">
            <Col>
              <p>{ this.props.repo.description }</p>
            </Col>
          </Row>
        </Col>
        <Col className="col-md-2 col-12 border py-4 text-center">
          <Row>
            <Col className="col-auto col-md-12">Stars:</Col>
            <Col className="col-auto col-md-12 pt-md-2 detail">
              <span>{ this.props.repo.stargazers_count }</span>
            </Col>
          </Row>
        </Col>
        <Col className="col-md-2 col-12 border py-4 text-center">
          <Row>
            <Col className="col-auto col-md-12">License:</Col>
            <Col className="col-auto col-md-12 pt-md-2 detail">
              <span>{this.props.repo.license ? this.props.repo.license.name : 'NONE'}</span>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}