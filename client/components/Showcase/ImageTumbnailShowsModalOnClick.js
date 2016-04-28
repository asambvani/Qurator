import React, { Component, PropTypes } from 'react'
import cn from 'classnames'
import autobind from 'autobind-decorator'
import { formattedLowestPrice } from 'services/formatMoney'
import config from 'services/config'
import styles from './styles'

const { image: { prefix } } = config

export default class ImageTumbnailShowsModalOnClick extends Component {
  static propTypes = {
    image: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    showModal: PropTypes.func.isRequired,
    imgClass: PropTypes.string,
  }

  @autobind
  showModal() {
    const { showModal, index } = this.props
    showModal(index)
  }

  render() {
    const { image, imgClass } = this.props
    return (
      <div className={cn(styles.imageBlock, imgClass)}>
        <div className= {styles.oneImageBlock}>
        <span className={styles.checkItem} onClick={this.showModal}>
        <i className="fa fa-eye" aria-hidden="true"></i></span>
        <img
          className={styles.image}
          src={`${prefix.tb}${image.url}`}
          onClick={this.showModal}
        />
        </div>
        <div className={styles.title}>
          {image.title}
        </div>
        <div className={styles.price}>
          {formattedLowestPrice}+
        </div>
      </div>
    )
  }
}
