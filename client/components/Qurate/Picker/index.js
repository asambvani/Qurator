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
        <h3 className={styles.pickHeader}>Choose the photos you like best</h3>
        <div className={styles.imageItems}>
        {images.map((img) => (

          <div
            key={img.id}
            className={includes(selectedIds, img.id) ? styles.selectedSlide : styles.slide}
          >
            <span className={styles.checkItem}></span>
            <img
              src={`${prefix.tb}${img.url}`}
              onClick={this.handleClick.bind(this, img)} // eslint-disable-line
            />
          </div>
        ))}
        </div>
        <div className={styles.stepsCircles}>
        <i className="fa fa-chevron-left" aria-hidden="true"></i>
        {range(maxSteps).map(i => (
          <div
            key={i}
            className={cn({ active: i === currentStep - 1 })}
          >
            <i className="fa fa-circle" aria-hidden="true"></i>
          </div>
        ))}
        <i className="fa fa-chevron-right" aria-hidden="true"></i>
        </div>
        <Button
          bsSize="large"
          bsStyle="primary"
          onClick={handleNextClick}
          className={styles.startButton}
        >
          Next
        </Button>
           <hr />
      </div>
    )
  }
}

export default Picker
