import React, { Component, PropTypes } from 'react'
import styles from './styles'
import autobind from 'autobind-decorator'
import config from 'services/config'
import { Col } from 'react-bootstrap'
const { image: { prefix } } = config

export default class ImageTumbnailShowsModalOnClick extends Component {
  static propTypes = {
    image: PropTypes.object.isRequired,
    showModal: PropTypes.func.isRequired,
  }

  @autobind
  showModal() {
    const { showModal, image } = this.props
    showModal(image)
  }

  render() {
    const { image } = this.props
    return (
      <Col
        xs={3}
        md={2}
        lg={1}
        key={image.id}
      >
        <img
          className={styles.image}
          src={`${prefix.tb}${image.url}`}
          onClick={this.showModal}
        />
      </Col>
    )
  }
}
