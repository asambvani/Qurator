import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import config from 'services/config'
import money from '../../services/formatMoney'
import styles from './styles'
import configShared from '../../../shared/config'
const { options: { variants } } = configShared
const { image: { prefix: { tb } } } = config

export default class CartItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
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
        item: { image: { url, title, description, artist, artistBio }, variant, qty },
        index,
      },
    } = this
    const rowTotal = money(qty * variants[variant].price)
    return (
      <tr>
        <td>{index + 1}</td>
        <td>
          <h5>{title}</h5>
          Description: {description}<br />
          Artist: {artist}<br />
          Bio: {artistBio}
        </td>
        <td><img
          className={styles.tumbnail}
          src={`${tb}${url}`}
        /></td>
        <td>{variants[variant].size}</td>
        <td>{qty}</td>
        <td><i
          className="glyphicon glyphicon-remove"
          onClick={removeFromCart}
        />
        </td>
        <td>{rowTotal}</td>
      </tr>
    )
  }
}
