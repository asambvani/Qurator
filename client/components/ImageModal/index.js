import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import autobind from 'autobind-decorator'
import { Modal, Button, Input } from 'react-bootstrap'
import { addToCart } from 'actions/cart'
import styles from './styles'

@connect(null, { addToCart })
class ImageModal extends Component {
  static propTypes = {
    active: PropTypes.bool,
    onClose: PropTypes.func,
    image: PropTypes.object,
    addToCart: PropTypes.func,
  }

  @autobind
  addToCart() {
    const { image, onClose } = this.props
    const { resolution, count } = this.refs
    this.props.addToCart({
      id: image.id,
      res: resolution.getValue(),
      count: count.getValue(),
    })
    onClose()
  }

  render() {
    const { active, onClose, image } = this.props
    const availableSizes = ['50x35inch', '20x15inch', '15x12inch']

    return (
      <Modal show={active} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Image: {image.url}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={`/img/thumb/${image.url}`} className={styles.image} />
        </Modal.Body>
        <Modal.Footer>
          <form className="form-inline pull-left" >
            <Input
              className={styles.paddingForm}
              ref="size"
              type="select"
              label="Size"
              placeholder="select"
            >
              {availableSizes.map(res => (
                <option key={res} value={res} >{res}</option>
              ))}
            </Input>
            <Input
              className={styles.paddingForm}
              ref="qty"
              label="Quantity"
              type="select"
              defaultValue="1"
            >
              {_.times(10, n => (
                <option key={n} value={n + 1} >{n + 1}</option>
              ))}
            </Input>
          </form>
          <Button
            onClick={this.addToCart}
            bsStyle="primary"
          >
            Add to cart
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ImageModal
