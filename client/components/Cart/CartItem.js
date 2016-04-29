import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import { find } from 'lodash'
import config from 'services/config'
import money from 'services/formatMoney'
import configShared from '../../../shared/config'
import styles from './styles'

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
          image: { url, title },
          size,
          qty,
          finish,
        },
      },
    } = this
    const price = find(variants, { finish, size }).price
    const rowTotal = money(qty * price)

    return (
      <tr>
        <td width="20"></td>
        <td className={styles.imageColumn}>
          <img
            className={styles.tumbnail}
            src={`${tb}${url}`}
          />
        </td>
        <td>
          <h4>{title}</h4>
          <div className="size">
            <i className="icon arrow_carrot-right">
            </i> Size : <span className={styles.grey}>{size}</span>
          </div>
          <div className="decoration">
             <i className="icon arrow_carrot-right">
             </i>  Finish : <span className={styles.grey}>{finish}</span>
          </div>
        </td>
        <td>{money(price)}</td>
        <td>{qty}</td>
        <td>{rowTotal}</td>
        <td>
          <a onClick={removeFromCart} className={styles.removeItem}>
            <i className="icon icon_close" />
          </a>
        </td>
        <td width="20"></td>
      </tr>
    )
  }
}
