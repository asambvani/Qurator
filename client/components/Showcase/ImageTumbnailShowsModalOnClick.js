import React, { Component, PropTypes } from 'react'
import styles from './styles'
import autobind from 'autobind-decorator'
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
      <div>
        <span></span>
        <img
          className={styles.image}
          src={`${prefix.tb}${image.url}`}
          onClick={this.showModal}
        />
        <div className={styles.title}>
          {image.title}
        </div>
      </div>
    )
  }
}
