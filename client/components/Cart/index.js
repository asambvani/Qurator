import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { Grid, Row, Table, Button } from 'react-bootstrap'
import { cartItems } from 'selectors'
import * as cartActions from 'actions/cart'
import CartItem from './CartItem'
import configShared from '../../../shared/config'
import money from 'services/formatMoney'
import config from 'services/config'
import styles from './styles'

// TODO fix hack, atm shopify-buy from npm is not building
const shopClient = ShopifyBuy.buildClient(config.shopify) // eslint-disable-line
const { options: { variants } } = configShared

@connect(state => ({
  items: cartItems(state),
}), cartActions)
class Cart extends Component {
  static propTypes = {
    items: PropTypes.array,
    removeFromCart: PropTypes.func.isRequired,
    resetCart: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  @autobind
  checkout() {
    const { items } = this.props
    this.setState({ redirectingToShopify: true })
    Promise.all(
      items.map(({ image: { productId } }) => shopClient.fetchProduct(productId))
    )
    .then(products => shopClient.createCart().then(cart => cart
      .addVariants.apply(
        cart,
        items.map(({ qty: quantity, variant }, index) => ({
          variant: products[index].variants[variant],
          quantity,
        }))
        )
      )
      .then(cart => {
        location.href = cart.checkoutUrl
      })
    )
    .catch(err => {
      console.error('Request failed', err)
    })
  }

  renderItems() {
    const { removeFromCart, items } = this.props
    return items.map(item => (
      <CartItem key={item.id} {...{ removeFromCart, item }} />
    ))
  }

  render() {
    const {
      checkout,
      props: { items, resetCart },
      state: { redirectingToShopify },
    } = this

    const total = {
      qty: items.reduce((sum, item) => sum + item.qty, 0),
      price: money(items.reduce((sum, item) => sum + item.qty * variants[item.variant].price, 0)),
    }

    return (
      <Grid>
        <Row>
          {items.length === 0 ?
            <div>Your cart is empty</div>
            :
            <div>
              <h2>Your cart items</h2>
              <Table striped bordered condensed hover>
                <thead>
                <tr>
                  <th colSpan="2">Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                  {this.renderItems()}
                </tbody>
              </Table>
              <div>
                <div
                  onClick={resetCart}
                  className={styles.resetCart}
                >
                  Clear shopping cart
                </div>
                <div className="total">
                  <div className="subtotal">
                    Sub total {total.price}
                  </div>
                  <div className="grantotal">
                    Grand total {total.price}
                  </div>
                </div>
              </div>

              <Button
                disabled={redirectingToShopify}
                className="pull-right"
                bsStyle="primary"
                bsSize="large"
                onClick={checkout}
              >
                {redirectingToShopify &&
                <i
                  className="fa fa-spinner fa-spin"
                  style={ { marginRight: '1em' } }
                /> }
                Proceed to checkout
              </Button>
            </div>
          }
        </Row>
      </Grid>
    )
  }
}

export default Cart
