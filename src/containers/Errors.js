import React, { Component } from 'react';
import { Alert } from 'reactstrap';

export default class Errors extends Component {
  render() {
    return(
      <Alert>
        <h4 className='alert-heading'> ERROR: { this.props.data && this.props.data.message }</h4>
        { this.props.data && this.props.data.errors.map((error, i) => <p className="mb=0">{error.code}: {error.message}</p>) }
      </Alert>
    );
  }
}
