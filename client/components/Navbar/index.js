import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, NavItem } from 'react-bootstrap'

const cartSelector = createStructuredSelector({
  cartCount: state => state.cart.reduce((sum, item) => sum + item.qty, 0),
})

@connect(cartSelector)
class QNavbar extends Component {
  static propTypes = {
    cartCount: PropTypes.number,
  }

  render() {
    return (
      <Navbar inverse >
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/app" >
              <img src="/img/logo.png" />
              Qurator
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/app/shop" >
              <NavItem> Shop entire store</NavItem>
            </LinkContainer>
            <LinkContainer to="/app/contacts" >
              <NavItem>Contacts</NavItem>
            </LinkContainer>
            <LinkContainer to="/app/about" >
              <NavItem>About</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight >
            <LinkContainer to="/app/cart" >
              <NavItem>
                <i className="glyphicon glyphicon-shopping-cart" /><span> </span>
                Cart ({this.props.cartCount})</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default QNavbar
