import React, { Component, PropTypes } from 'react'
import cn from 'classnames'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Badge, Nav, Navbar, NavItem, Grid } from 'react-bootstrap'
import styles from './style'

const cartSelector = createStructuredSelector({
  cartCount: state => state.cart.reduce((sum, item) => sum + item.qty, 0),
})

@connect(cartSelector)
class QNavbar extends Component {
  static propTypes = {
    cartCount: PropTypes.number,
    routes: PropTypes.array,
  }

  render() {
    const { routes } = this.props
    const specRoute = routes[routes.length - 1]
    const activeRouteName = specRoute.name

    return (
      <div className={styles.navbarContainer}>
        <Navbar fluid className={styles.navBarMain}>
          <Navbar.Header className={styles.navBarHeader}>
            <Navbar.Toggle />
            <Navbar.Brand className={styles.navBarBrand}>
              <Link to="/" >
                <img src="/img/logo.jpg" />
              </Link>
            </Navbar.Brand>
            <Nav pullRight className={cn(styles.navBarMenu, styles.navBarCart)} lgHidden>
              <LinkContainer to="/cart" >
                <NavItem>
                  <i className={styles.shoppingCart} />
                  {this.props.cartCount > 0 && <Badge className={styles.badgeRed}>
                    {this.props.cartCount}
                  </Badge>
                  }
                </NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Header>
          <Navbar.Collapse className={styles.navBar}>
            <Nav className={styles.navBarMenu}>
              <LinkContainer to="/" >
                <NavItem>Home</NavItem>
              </LinkContainer>
              <LinkContainer to="/qurate" >
                <NavItem>Qurator</NavItem>
              </LinkContainer>
              <LinkContainer to="/shop" >
                <NavItem>Shop</NavItem>
              </LinkContainer>
              <LinkContainer to="/about" >
                <NavItem>About us</NavItem>
              </LinkContainer>
              <LinkContainer to="/contacts" >
                <NavItem>Contact</NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight className={styles.navBarCartLG}>
              <LinkContainer to="/cart" >
                <NavItem>
                  <i className={styles.shoppingCart} />
                  {this.props.cartCount > 0 && <Badge className={styles.badgeRed}>
                    {this.props.cartCount}
                  </Badge>
                  }
                </NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Grid fluid>
        {
          activeRouteName &&
          <div className={cn(styles.title, specRoute.path)}>
            {activeRouteName}
          </div>
        }
        </Grid>
      </div>
    )
  }
}

export default QNavbar
