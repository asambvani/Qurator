import React, { Component, PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import includes from 'lodash/includes'
import { range } from 'lodash'
import cn from 'classnames'
import config from 'services/config'
import styles from './styles'

const { image: { prefix }, picker: { maxSteps } } = config

class Picker extends Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    pickImage: PropTypes.func.isRequired,
    unpickImage: PropTypes.func.isRequired,
    handleNextClick: PropTypes.func,
    picker: PropTypes.shape({
      images: PropTypes.array.isRequired,
      selectedIds: PropTypes.array.isRequired,
    }),
  }

  handleClick({ id }) {
    const { picker: { selectedIds }, pickImage, unpickImage } = this.props
    includes(selectedIds, id) ? unpickImage(id) : pickImage(id) // eslint-disable-line
  }

  render() {
    const {
      currentStep,
      handleNextClick,
      picker: { images, selectedIds },
    } = this.props

    return (
      <div className={styles.picker} >
        <h3>Picker the photos you like best</h3>
        {images.map((img) => (
          <img
            key={img.id}
            src={`${prefix.tb}${img.url}`}
            className={includes(selectedIds, img.id) ? styles.selectedSlide : styles.slide}
            onClick={this.handleClick.bind(this, img)} // eslint-disable-line
          />
        ))}
        {range(maxSteps).map(i => (
          <div key={i} className={cn({ active: i === currentStep })}>i</div>
        ))}
        <Button
          bsSize="large"
          bsStyle="primary"
          onClick={handleNextClick}
          className={styles.startButton}
        >
          Next
        </Button>
      </div>
    )
  }
}

export default Picker
