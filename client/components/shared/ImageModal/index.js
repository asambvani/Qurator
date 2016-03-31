import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { Modal, Button, Input } from 'react-bootstrap'
import { addToCart } from 'actions/cart'

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
    const availableResolutions = ['1920x1080', '1680x1050', '1280x1024']

    return (
      <Modal show={active} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Image: {image.url}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Options</h4>
          <p>Freaking text</p>
          <form>
            <Input
              ref="resolution"
              type="select"
              label="Select
              resolution"
              placeholder="select"
            >
              {availableResolutions.map(res => (
                <option key={res} value={res}>{res}</option>
              ))}
            </Input>
            <Input ref="count" label="Count" type="number" defaultValue="1" />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Close</Button>
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
