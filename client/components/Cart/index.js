import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { Grid, Row, Table, Button } from 'react-bootstrap'
import { find, findIndex } from 'lodash'
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

  state = {}

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
        items.map(({ qty: quantity, finish, size }, index) => ({
          variant: products[index].variants[findIndex(variants, { finish, size })],
          quantity,
        }))
      ))
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
      price: money(items.reduce((sum, item) =>
        sum + item.qty * find(variants, { size: item.size }).price
      , 0)),
    }

    return (
      <Grid>
        <Row>
          {items.length === 0 ?
            <div className={styles.empty}><h3>Your cart is empty</h3></div>
            :
            <Grid className={styles.cartContainer}>
              <h2>Your cart items</h2>
              <Table condensed responsive className={styles.cartTable}>
                <thead>
                <tr>
                  <th width="20"></th>
                  <th colSpan="2">Image</th>
                  <th width="70">Price</th>
                  <th width="50">Quantity</th>
                  <th width="50">Total</th>
                  <th width="10"></th>
                  <th width="20"></th>
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
                <div className={styles.total}>
                  <div className={styles.subtotal}>
                    Sub total {total.price}
                  </div>
                  <div className={styles.grandTotal}>
                    Grand total <span className={styles.totalPrice}> {total.price}</span>
                  </div>
                </div>
              </div>

              <Button
                disabled={redirectingToShopify}
                className={`pull-right ${styles.buttonCheck}`}
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
            </Grid>
          }
        </Row>
      </Grid>
    )
  }
}

export default Cart
