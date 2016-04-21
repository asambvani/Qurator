import React, { Component, PropTypes } from 'react'
import styles from './styles'
import autobind from 'autobind-decorator'
import { formattedLowestPrice } from 'services/formatMoney'
import config from 'services/config'
const { image: { prefix } } = config

export default class ImageTumbnailShowsModalOnClick extends Component {
  static propTypes = {
    image: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    showModal: PropTypes.func.isRequired,
  }

  @autobind
  showModal() {
    const { showModal, index } = this.props
    showModal(index)
  }

  render() {
    const { image } = this.props
    return (
      <div className={styles.imageBlock}>
        <span className={styles.checkItem} onClick={this.showModal}></span>
        <img
          className={styles.image}
          src={`${prefix.tb}${image.url}`}
          onClick={this.showModal}
        />
        <div>
          {image.title}
        </div>
        <div className={styles.price}>
          {formattedLowestPrice}
        </div>
      </div>
    )
  }
}
