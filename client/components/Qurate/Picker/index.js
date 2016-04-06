import React, { Component, PropTypes } from 'react'
import styles from './styles'
import config from 'services/config'
import includes from 'lodash/includes'
const { image: { prefix } } = config

class Picker extends Component {
  static propTypes = {
    pickImage: PropTypes.func.isRequired,
    unpickImage: PropTypes.func.isRequired,
    picker: PropTypes.shape({
      images: PropTypes.array.isRequired,
      selectedIds: PropTypes.array.isRequired,
    }),
  }

  handleClick({ id }) {
    const { picker: { selectedIds }, pickImage, unpickImage } = this.props
    if (includes(selectedIds, id)) {
      unpickImage(id)
    } else {
      pickImage(id)
    }
  }

  render() {
    const { picker: { images, selectedIds } } = this.props
    return (
      <div className={styles.picker} >
        {images.map((img) => (
          <img
            key={img.id}
            src={`${prefix.tb}${img.url}`}
            className={includes(selectedIds, img.id) ? styles.selectedSlide : styles.slide}
            onClick={this.handleClick.bind(this, img)} // eslint-disable-line
          />
        ))}
      </div>
    )
  }
}

export default Picker
