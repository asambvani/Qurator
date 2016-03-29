import React from 'react'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, NavItem } from 'react-bootstrap'

export default class QNavbar extends React.Component {
  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/app/qurate">
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
            <LinkContainer to="/app/qurate" >
              <NavItem>Qurate</NavItem>
            </LinkContainer>
            <LinkContainer to="/app/shop" >
              <NavItem> Shop entire store</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <LinkContainer to="/app/cart" >
              <NavItem> Cart</NavItem>
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
