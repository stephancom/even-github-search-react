import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const licenses = ["", "MIT", "ISC", "Apache", "GPL"];

class Search extends Component {
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
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    this.setState({searching: true});
    // TODO
    this.setState({searching: false});
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
            <img alt="searching..." v-if="this.state.searching" src="SpinnyBalls.gif" />
            <p v-else="v-else">
              <errors v-if="error_response" data={this.error_response}></errors>
              <span v-else-if="repositories == null">Please enter query and click SEARCH above, results appear here</span>
              <span v-else-if="repositories.length == 0">No results</span><span v-else="v-else">SEARCH results</span>
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <repository v-for="repo in repositories" repo="repo"></repository>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;


