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
    initialValues: {
      variant: '0',
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
    fields: PropTypes.object,
    resetForm: PropTypes.func,
    currentIndex: PropTypes.number,
    imagesCount: PropTypes.number,
    handleNextClick: PropTypes.func,
    handlePrevClick: PropTypes.func,
    values: PropTypes.object,
  }

  @autobind
  addToCart() {
    const {
      onClose, resetForm, addToCart,
      image: { id },
      fields: { variant: { value: variant }, qty: { value: qty } },
    } = this.props
    addToCart({ id, variant, qty: parseInt(qty, 10) })
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
      fields: { variant, qty, decoration },
      values,
    } = this.props
    const currentVariant = variants[+values.variant]

    return (
      <Modal show={isActive} onHide={onClose} bsSize="large" className={styles.modalContent}>
        <Modal.Body className={styles.modalBody}>
          <Row>
            <Col md={4}>
              <div className="image">
                <img src={`${prefix.large}${image.url}`} className={styles.image} />
              </div>
              <div className={styles.threeImagesBlock}>
                <img src={`${prefix.large}${image.url}`} className={styles.threeImage} />
                <img src={`${prefix.large}${image.url}`} className={styles.threeImage} />
                <img src={`${prefix.large}${image.url}`} className={styles.threeImage} />
              </div>
              <div className="author">
                <div className="artistName">{image.artist}</div>
                <div className="artistBio"></div>
              </div>
            </Col>
            <Col md={8}>
              <div className={`close ${styles.closeBtn}`} onClick={onClose}>
                <i className="icon icon_close"></i>
              </div>
              <h2 className={styles.title}>{image.title}</h2>
              <p>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <span> Be the first to review the product</span>
              </p>
              <p className={styles.price}>
                ${currentVariant && values.qty * currentVariant.price}
              </p>
              <form className="form" >
                <div className={styles.selectDiv}>
                  <Select
                    resetValue={{}}
                    value={decoration.value}
                    className={styles.selectInput}
                    onChange={decoration.onChange}
                    placeholder="Choose a size that you like..."
                    options={decorations.map(value => ({ value, label: value }))}
                  />
                  <Select
                    resetValue={{}}
                    value={variant.value}
                    className={styles.selectInput}
                    onChange={variant.onChange}
                    placeholder="Choose a size that you like..."
                    options={variants.map(({ size }, index) =>
                      ({ value: index.toString(), label: size })
                    )}
                  />
                  <span>Field Required *</span>
                </div>
                <div className={styles.addToCartBlock}>
                  <div className={styles.QuantityAdd}>
                    <label>Quantity</label>
                    <div className={styles.inputAdd}>
                      <div
                        className={styles.dec}
                        onClick={() => { if (qty.value > 1) qty.onChange(qty.value - 1) }}
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
                    onClick={this.addToCart}
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
