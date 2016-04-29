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
            <i className="icon arrow_carrot-right"></i> Size : <span className={styles.grey}>{variants[variant].size}</span>
          </div>
          <div className="decoration">
             <i className="icon arrow_carrot-right"></i>  Finish : <span className={styles.grey}>{decoration}</span>
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
