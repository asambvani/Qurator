import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import autobind from 'autobind-decorator'
import { Modal, Button, Input } from 'react-bootstrap'
import times from 'lodash/times'
import { addToCart } from 'actions/cart'
import config from 'services/config'
import styles from './styles'

const { options, image: { prefix } } = config

@reduxForm(
  {
    form: 'image-popup',
    fields: ['size', 'qty'],
    initialValues: {
      size: options.size[0],
      qty: 1,
    },
  },
  null,
  { addToCart }
)
class ImageModal extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    onClose: PropTypes.func,
    image: PropTypes.object,
    addToCart: PropTypes.func,
    handleSubmit: PropTypes.func,
    fields: PropTypes.object,
    resetForm: PropTypes.func,
  }

  @autobind
  addToCart() {
    const { image, onClose, resetForm, fields: { size, qty } } = this.props
    this.props.addToCart({
      id: image.id,
      size: size.value,
      qty: qty.value,
    })
    onClose()
    resetForm()
  }

  render() {
    const { isActive, onClose, image, handleSubmit, fields: { size, qty } } = this.props

    return (
      <Modal show={isActive} onHide={onClose} bsSize="large" >
        <Modal.Header closeButton >
          <Modal.Title>Image: {image.url}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={`${prefix.large}${image.url}`} className={styles.image} />
        </Modal.Body>
        <Modal.Footer>
          <form onSubmit={handleSubmit} className="form-inline pull-left" >
            <Input
              {...size}
              label="Size"
              type="select"
              value={size.value}
              className={styles.paddingForm}
            >
              {options.size.map(res => (
                <option key={res} value={res} >{res}</option>
              ))}
            </Input>
            <Input
              {...qty}
              label="Quantity"
              type="select"
              defaultValue="1"
              className={styles.paddingForm}
            >
              {times(options.qty, n => (
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
