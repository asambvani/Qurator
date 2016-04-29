import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import config from 'services/config'
import money from 'services/formatMoney'
import styles from './styles'
import configShared from '../../../shared/config'
const { options: { variants } } = configShared
const { image: { prefix: { tb } } } = config

export default class CartItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    removeFromCart: PropTypes.func.isRequired,
  }

  @autobind
  removeFromCart() {
    const { removeFromCart, item } = this.props
    removeFromCart(item)
  }

  render() {
    const {
      removeFromCart,
      props: {
        item: {
          image: { url, title, description, artist },
          variant,
          qty,
          decoration,
        },
      },
    } = this
    const price = variants[variant].price
    const rowTotal = money(qty * price)

    return (
      <tr>
        <td className={styles.imageColumn}>
          <img
            className={styles.tumbnail}
            src={`${tb}${url}`}
          />
        </td>
        <td>
          <h4>{title}</h4>
          <div className="size">
            Size: {variants[variant].size}
          </div>
          <div className="decoration">
            Finish: {decoration}
          </div>
        </td>
        <td>{money(price)}</td>
        <td>{qty}</td>
        <td>{rowTotal}</td>
        <td>
          <a onClick={removeFromCart}>
            <i className="fa fa-remove" />
          </a>
        </td>
      </tr>
    )
  }
}
