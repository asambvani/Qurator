import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import autobind from 'autobind-decorator'
import { Modal, Button, Input } from 'react-bootstrap'
import times from 'lodash/times'
import { addToCart as addToCartAction } from 'actions/cart'
import config from 'services/config'
import configShared from '../../../shared/config'
import styles from './styles'

const { image: { prefix } } = config
const { options, options: { variants } } = configShared
const sizes = variants.map(variant => variant.size)

@reduxForm(
  {
    form: 'image-popup',
    fields: ['size', 'qty'],
    initialValues: {
      size: '0',
      qty: 1,
    },
  },
  null,
  { addToCart: addToCartAction }
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
    const {
      onClose, resetForm, addToCart,
      image: { id },
      fields: { size: { value: size }, qty: { value: qty } },
    } = this.props
    addToCart({ id, size, qty: parseInt(qty, 10) })
    onClose()
    resetForm()
  }

  render() {
    const { isActive, onClose, image, handleSubmit, fields: { size, qty } } = this.props

    return (
      <Modal show={isActive} onHide={onClose} bsSize="large" >
        <Modal.Header closeButton >
          <Modal.Title>{image.title}</Modal.Title>
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
              {sizes.map((res, index) => (
                <option key={res} value={index.toString()} >{res}</option>
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
