import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import autobind from 'autobind-decorator'
import { Modal, Button, Input, Row, Col } from 'react-bootstrap'
import times from 'lodash/times'
import { addToCart as addToCartAction } from 'actions/cart'
import config from 'services/config'
import configShared from '../../../shared/config'
import styles from './styles'

const { image: { prefix } } = config
const { options, options: { variants } } = configShared

@reduxForm(
  {
    form: 'image-popup',
    fields: ['variant', 'qty'],
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
    handleSubmit: PropTypes.func,
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
      handleSubmit,
      handleNextClick,
      handlePrevClick,
      fields: { variant, qty },
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
              <div className="author">
                <div className="artistName">{image.artist}</div>
                <div className="artistBio">{image.artistBio}</div>
              </div>
            </Col>
            <Col md={8}>
            <div className={`close ${styles.closeBtn}`} onClick={onClose}>x</div>
              <h2 className={styles.title}>{image.title}</h2>
              <p><i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star" aria-hidden="true"></i>
              <span> Be the first to review the product</span></p>
              <p className={styles.price}>
                ${currentVariant && values.qty * currentVariant.price}
              </p>
              <form onSubmit={handleSubmit} className="form" >
                <Input
                  {...variant}
                  label="Size"
                  type="select"
                  value={variant.value}
                >
                  {variants.map(({ size }, index) => (
                    <option key={index} value={index.toString()} >{size}</option>
                  ))}
                </Input>
                <div className={styles.addToCartBlock}>
                <Input
                  {...qty}
                  label="Quantity"
                  type="select"
                  defaultValue="1"
                >
                  {times(options.qty, n => (
                    <option key={n} value={n + 1} >{n + 1}</option>
                  ))}
                </Input>
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
