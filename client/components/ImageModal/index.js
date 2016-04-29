import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import autobind from 'autobind-decorator'
import { Modal, Button, Input, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import { addToCart as addToCartAction } from 'actions/cart'
import config from 'services/config'
import configShared from '../../../shared/config'
import styles from './styles'

const { image: { prefix } } = config
const { options: { variants, decorations } } = configShared

@reduxForm(
  {
    form: 'image-popup',
    fields: ['variant', 'qty', 'decoration'],
    initialValues: { qty: 1 },
    validate: ({ variant, decoration }) => { // eslint-disable-line
      const errors = {}
      if (!variant) { errors.variant = 'Field Required *' }
      if (!decoration) { errors.decoration = 'Field Required *' }
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
      values: { variant, qty, decoration },
    } = this.props
    addToCart({ id, variant, qty: parseInt(qty, 10), decoration })
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
      fields: { variant, qty, decoration },
      values,
    } = this.props
    const currentVariant = variants[+values.variant]

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
              <div className={styles.author} >
                <div className={styles.artistImage} >
                  <img src={`${prefix.large}${image.url}`} />
                </div>
                <div className={styles.artistData} >
                  <div className={styles.artistName} >{image.artist}</div>
                  <div className={styles.artistBio} ></div>
                </div>
              </div>
            </Col>
            <Col md={7}>
              <div className={`close ${styles.closeBtn}`} onClick={onClose}>
                <i className="icon icon_close"></i>
              </div>
              <h2 className={styles.title}>{image.title}</h2>
              {currentVariant &&
              <p className={styles.price}>
                ${values.qty * currentVariant.price}
              </p>
              }
              <form className="form">
                <div className={styles.selectDiv}>
                  <label>Size</label>
                  <Select
                    resetValue={{}}
                    value={variant.value}
                    className={styles.selectInput}
                    onChange={variant.onChange}
                    placeholder="Choose a finish that you like..."
                    options={variants.map(({ size }, index) =>
                      ({ value: index.toString(), label: size })
                    )}
                  />
                  {variant.touched && <div>{variant.error}</div>}
                  <label>Finish</label>
                  <Select
                    resetValue={{}}
                    value={decoration.value}
                    className={styles.selectInput}
                    onChange={decoration.onChange}
                    placeholder="Choose a size that you like..."
                    options={decorations.map(value => ({ value, label: value }))}
                  />
                  {decoration.touched && <div>{decoration.error}</div>}
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
