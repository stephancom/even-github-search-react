import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from '../github_axios';
import Repository from './Repository';
import Errors from './Errors';

const licenses = ["", "MIT", "ISC", "Apache", "GPL"];
const searchPath = "/search/repositories";
const starsRegexp = /^\s*(<|>|>=|<=)?(\*?|\d*)(\.{2,3}(\*?|\d+))?\s*$/;

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: '',
      stars: '',
      license: '',
      fork: false,
      topicValid: true,
      starsValid: true,
      searching: false,
      error_response: null,
      repositories: null,
      searchOk: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  paramOK(key) {
    return this.state[key] && /\S/.test(this.state[key]);
  }
  paramEncode(key) {
    return encodeURIComponent(this.state[key].trim());
  }
  isValid() {
    this.setState({
      starsValid: this.state.stars === null || this.state.stars.length < 1 || starsRegexp.test(this.state.stars),
      // topic can be blank if license or stars are filled in
      topicValid: this.state.stars != null || this.state.license != null || (this.state.topic != null && this.state.topic.length > 0)
    });

    return this.state.topicValid && this.state.starsValid;
  }
  clearValid() { 
    this.setState({starsValid: true, topicValid: true });
  }
  urlParams() {
    var params = {};
    if (this.paramOK("topic"))   { params["topic"] = this.state.topic; }
    if (this.paramOK("stars"))   { params["stars"] = this.state.stars; }
    if (this.paramOK("license")) { params["license"] = this.state.license; }
    if (this.paramOK("fork"))    { params["fork"] = true; }
    return params;
  }
  queryParams() {
    var query = [];
    if (this.paramOK("topic"))   { query.push(this.paramEncode("topic")); }
    if (this.paramOK("stars"))   { query.push("stars:" + this.paramEncode("stars")); }
    if (this.paramOK("license")) { query.push("license:" + this.paramEncode("license")); }
    if (this.paramOK("fork"))    { query.push("fork:true"); }
    return query;
  }

  queryMessage() {
    if(this.state.repositories === null) {
      return "Please enter query and click SEARCH above, results appear here";
    } else if(this.state.repositories.length === 0) {
      return "No results";
    } else {
      return "SEARCH results"
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.isValid()) { return; }
    var q = this.queryParams();
    this.setState({repositories: [], searching: true, error_response: null});

    // RIGHT (but GitHub expects something weird)
    // axios.get(searchPath, { params: { q: q.join('+') } })
    // WRONG (but it works)
    axios
      .get(searchPath + "?q=" + q.join("+"))
      .then(response => {
        this.setState({repositories: response.data.items});
      })
      .catch(error => {
        this.setState({repositories: null, error_response: error.response.data});
      })
      .then(() => {
        this.setState({searching: false});
      });
  }

  render() {
    return(
      <Container>
        <Row>
          <Col>topic: {this.state.topic}</Col>
          <Col>stars: {this.state.stars}</Col>
          <Col>license: {this.state.license}</Col>
          <Col>fork: {this.state.fork ? 'true' : 'false'}</Col>
        </Row>
        <hr/>
        <Row>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col className="col-md px-md-4 px-2">                          
                  <FormGroup invalid-feedback="Cannot be blank">
                    <Label for="topic">Text</Label>
                    <Input id="topic" type="text" name="topic" value={this.state.topic} onChange={this.handleInputChange} placeholder="topic" validated="validated" className={this.state.topicValid ? '' : 'is-invalid'} disabled={this.state.searching}/>
                  </FormGroup>
                </Col>
                <Col className="col-md px-md-4 px-2">
                  <FormGroup invalid-feedback="examples: 100, &gt;50, &lt;=200, 100..5000">
                    <Label for="stars">Stars</Label>
                    <Input id="stars" type="text" name="stars" value={this.state.stars} onChange={this.handleInputChange} placeholder="stars" validated="validated" className={this.state.starsValid ? '' : 'is-invalid'} disabled={this.state.searching}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="col-md px-md-4 px-2">                          
                  <FormGroup>
                    <Label for="license">License</Label>
                    <Input id="license" type="select" name="license" value={this.state.license} onChange={this.handleInputChange} disabled={this.state.searching}>
                      {licenses.map((value, i) => <option key={i} value={value}>{value}</option>)}
                    </Input>
                  </FormGroup>
                </Col>
                <Col className="pt-4 col-md px-md-4 px-2">                          
                  <FormGroup size="lg">
                      <Input id="fork" type="checkbox" name="fork" checked={this.state.fork} onChange={this.handleInputChange} disabled={this.state.searching}/>{' '} Include Forked
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="footer text-center">
                  <Button type="submit" variant="primary" disabled={this.state.searching}>Search</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col className="text-center m-5">
            { this.state.searching ? (
              <img alt="searching..." v-if="this.state.searching" src="SpinnyBalls.gif" />
            ) : (
              <div>
                { this.state.error_response ? (
                  <Errors data={this.state.error_response}></Errors>
                ) : (
                  <p>{this.queryMessage()}</p>
                ) }
              </div>
            ) }
          </Col>
        </Row>
        { this.state.repositories && this.state.repositories.map((repo, i) => <Repository key={i} repo={repo}></Repository>) }
      </Container>
    );
  }
}
