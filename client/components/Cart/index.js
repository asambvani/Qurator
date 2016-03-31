import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Table } from 'react-bootstrap'
import { cartItems } from 'selectors'
import { addToCart, removeFromCart, resetCart } from 'actions/cart'

@connect(state => ({
  items: cartItems(state),
}), { addToCart, removeFromCart, resetCart })
class Cart extends Component {
  static propTypes = {
    items: PropTypes.array,
  }

  renderItems() {
    return this.props.items.map((item, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{item.image.url}</td>
        <td>{item.res}</td>
        <td>{item.count}</td>
      </tr>
    ))
  }

  render() {
    return (
      <Grid>
        <Row>
          <h1>Cart</h1>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Resolution</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {this.renderItems()}
            </tbody>
          </Table>
        </Row>
      </Grid>
    )
  }
}

export default Cart
