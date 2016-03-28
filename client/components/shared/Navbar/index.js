import React from 'react'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap'

// export default () => ( // I need hot-reload :)
export default class QNavbar extends React.Component {
  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <img src="/img/logo.png" />
              Qurator
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/aboutus.htm">About us</NavItem>
            <NavItem eventKey={2} href="/qurate.htm">Qurate</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="/entire-store.htm">
              Shop entire store
            </NavItem>
            <LinkContainer to="/contacts">
              <NavItem eventKey={2}>Contacts</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
// )
