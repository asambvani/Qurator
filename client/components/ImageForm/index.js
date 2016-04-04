import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Input } from 'react-bootstrap'
import _ from 'lodash'
import config from 'services/config'
import styles from './styles'

const { options } = config

@reduxForm({
  form: 'image-popup',
  fields: ['size', 'qty'],
  initialValues: {
    size: options.size[0],
    qty: 1,
  },
})
class ImageForm extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    onClose: PropTypes.func,
    image: PropTypes.object,
    addToCart: PropTypes.func,
    handleSubmit: PropTypes.func,
    fields: PropTypes.object,
    resetForm: PropTypes.func,
  }

  render() {
    const { handleSubmit, fields: { size, qty } } = this.props

    return (
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
          {_.times(options.qty, n => (
            <option key={n} value={n + 1} >{n + 1}</option>
          ))}
        </Input>
      </form>
    )
  }
}

export default ImageForm

