import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Table, Button } from 'react-bootstrap'
import { cartItems } from 'selectors'
import * as cartActions from 'actions/cart'
import CartItem from './CartItem'

@connect(state => ({
  items: cartItems(state),
}), cartActions)
class Cart extends Component {
  static propTypes = {
    items: PropTypes.array,
    removeFromCart: PropTypes.func.isRequired,
  }

  renderItems() {
    const { removeFromCart, items } = this.props
    return items.map((item, index) => (
      <CartItem key={item.id} {...{ removeFromCart, item, index }} />
    ))
  }

  render() {
    const { items } = this.props

    return (
      <Grid>
        <Row>
          <h1>Cart</h1>
          {items.length === 0 ?
            <div>Your cart is empty</div>
            :
            <div>
              <Table striped bordered condensed hover >
                <thead>
                <tr>
                  <th>#</th>
                  <th>Info</th>
                  <th>Image</th>
                  <th>Size</th>
                  <th>Count</th>
                  <th>Remove</th>
                </tr>
                </thead>
                <tbody>
                {this.renderItems()}
                </tbody>
              </Table>
              Total:{items.reduce((sum, item) => sum + item.qty, 0)}
              <Button
                className="pull-right"
                bsStyle="primary"
                bsSize="large"
              >
                Checkout
              </Button>
            </div>
          }

        </Row>
      </Grid>
    )
  }
}

export default Cart
