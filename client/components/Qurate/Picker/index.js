import React, { Component, PropTypes } from 'react'
import styles from './styles'
import config from 'services/config'
const { image: { prefix } } = config

class Picker extends Component {
  static propTypes = {
    selectedImagesIds: PropTypes.object.isRequired,
    currentPicker: PropTypes.array.isRequired,
    pickImage: PropTypes.func.isRequired,
    unpickImage: PropTypes.func.isRequired,
  }

  handleClick({ id }) {
    const { selectedImagesIds, pickImage: pick, unpickImage: unpick } = this.props
    if (selectedImagesIds.has(id)) {
      unpick(id)
    } else {
      pick(id)
    }
  }

  render() {
    const { currentPicker, selectedImagesIds } = this.props
    return (
      <div className={styles.picker}>
        {currentPicker.map((img) => (
          <img
            key={img.id}
            src={`${prefix.tb}${img.url}`}
            className={selectedImagesIds.has(img.id) ? styles.selectedSlide : styles.slide}
            onClick={this.handleClick.bind(this, img)} // eslint-disable-line
          />
        ))}
      </div>
    )
  }
}

export default Picker
