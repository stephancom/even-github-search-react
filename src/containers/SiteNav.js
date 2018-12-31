import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

class SiteNav extends Component {
  render() {
    return(
      <Navbar color='primary'>
        <NavbarBrand href='/'>
          <img src='logo.png' alt='Even Financial Logo' height='20'/>
        </NavbarBrand>
      </Navbar>
    );
  }
}

export default SiteNav;