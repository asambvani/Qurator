import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import autobind from 'autobind-decorator'
import { Modal, Button, Input, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import { find } from 'lodash'
import { addToCart as addToCartAction } from 'actions/cart'
import config from 'services/config'
import configShared from '../../../shared/config'
import styles from './styles'

const { image: { prefix } } = config
const { options: { variants, finishes, sizes } } = configShared

@reduxForm(
  {
    form: 'image-popup',
    fields: ['size', 'qty', 'finish'],
    initialValues: { qty: 1 },
    validate: ({ size, finish }) => { // eslint-disable-line
      const errors = {}
      if (!size) { errors.size = 'Field Required *' }
      if (!finish) { errors.finish = 'Field Required *' }
      return errors
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
    fields: PropTypes.object,
    resetForm: PropTypes.func,
    currentIndex: PropTypes.number,
    imagesCount: PropTypes.number,
    handleNextClick: PropTypes.func,
    handlePrevClick: PropTypes.func,
    handleSubmit: PropTypes.func,
    values: PropTypes.object,
  }

  @autobind
  addToCart() {
    const {
      onClose, resetForm, addToCart,
      image: { id },
      values: { size, qty, finish },
    } = this.props
    addToCart({ id, size, qty: parseInt(qty, 10), finish })
    onClose()
    resetForm()
  }

  render() {
    const {
      isActive,
      onClose,
      image = {},
      currentIndex = 0,
      imagesCount = 0,
      handleNextClick,
      handlePrevClick,
      handleSubmit,
      fields: { size, qty, finish },
      values,
    } = this.props

    const variant = find(variants, { size: values.size }) || variants[0]

    return (
      <Modal show={isActive} onHide={onClose} bsSize="large" className={styles.modalContent}>
        <Modal.Body className={styles.modalBody}>
          <Row>
            <Col md={5}>
              <div className="image">
                <img src={`${prefix.large}${image.url}`} className={styles.image} />
              </div>
              <div className={styles.threeImagesBlock} >
                <img src={`${prefix.large}${image.url}`} className={styles.threeImage} />
                <img src={`${prefix.large}${image.url}`} className={styles.threeImage} />
                <img src={`${prefix.large}${image.url}`} className={styles.threeImage} />
              </div>
            </Col>
            <Col md={7}>
              <div className={`close ${styles.closeBtn}`} onClick={onClose}>
                <i className="icon icon_close"></i>
              </div>
              <h2 className={styles.title}>{image.title}</h2>
              {variant &&
              <p className={styles.price}>
                ${values.qty * variant.price}
              </p>
              }
              <form className="form">
                <div className={styles.selectDiv}>
                  <label>Size</label>
                  <Select
                    resetValue={{}}
                    value={size.value}
                    className={styles.selectInput}
                    onChange={size.onChange}
                    placeholder="Choose a finish that you like..."
                    options={sizes.map(value => ({ value, label: value }))}
                  />
                  {size.touched && <div>{size.error}</div>}
                  <label>Finish</label>
                  <Select
                    resetValue={{}}
                    value={finish.value}
                    className={styles.selectInput}
                    onChange={finish.onChange}
                    placeholder="Choose a size that you like..."
                    options={finishes.map(value => ({ value, label: value }))}
                  />
                  {finish.touched && <div>{finish.error}</div>}
                </div>
                <div className={styles.addToCartBlock}>
                  <div className={styles.QuantityAdd}>
                    <label>Quantity</label>
                    <div className={styles.inputAdd}>
                      <div
                        className={styles.dec}
                        onClick={() => { if (qty.value > 1) {qty.onChange(qty.value - 1) } }}
                      >
                        -
                      </div>
                      <Input
                        {...qty}
                        disabled
                        type="number"
                        defaultValue="1"
                        className={styles.inputAddQuantity}
                      />
                      <div
                        className={styles.inc}
                        onClick={() => qty.onChange(qty.value + 1)}
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={handleSubmit(this.addToCart)}
                    bsStyle="primary"
                  >
                    Add to cart
                  </Button>
                </div>
              </form>
            </Col>
          </Row>
        </Modal.Body>
        <Button
          className={currentIndex === 0 ? 'hidden' : styles.navButtonPrev}
          onClick={handlePrevClick}
        >
          Prev
        </Button>
        <Button
          className={currentIndex === imagesCount ? 'hidden' : styles.navButtonRight}
          onClick={handleNextClick}
        >
          Next
        </Button>
      </Modal>
    )
  }
}

export default ImageModal
