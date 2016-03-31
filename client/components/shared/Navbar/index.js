import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, NavItem } from 'react-bootstrap'

@connect(state => ({ cart: state.cart }))
class QNavbar extends Component {
  static propTypes = {
    cart: PropTypes.array.isRequired,
  }

  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/app">
              <img src="/img/logo.png" />
              Qurator
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/app/about" >
              <NavItem>About</NavItem>
            </LinkContainer>
            <LinkContainer to="/app" >
              <NavItem>Qurate</NavItem>
            </LinkContainer>
            <LinkContainer to="/app/shop" >
              <NavItem> Shop entire store</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <LinkContainer to="/app/cart" >
              <NavItem>Cart {this.props.cart.length}</NavItem>
            </LinkContainer>
            <LinkContainer to="/app/contacts">
              <NavItem>Contacts</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default QNavbar
