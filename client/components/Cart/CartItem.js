import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'

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
        item: { image: { title, description, artist, artistBio }, size, qty },
        index,
      },
    } = this

    return (
      <tr>
        <td>{index + 1}</td>
        <td>
          <h5>{title}</h5>
          Description: {description}<br />
          Artist: {artist}<br />
          Bio: {artistBio}
        </td>
        <td>{size}</td>
        <td>{qty}</td>
        <td><i
          className="glyphicon glyphicon-remove"
          onClick={removeFromCart}
        />
        </td>
      </tr>
    )
  }
}
