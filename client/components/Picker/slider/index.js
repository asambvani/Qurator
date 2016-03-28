import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { onImagePick, onImageUnpick } from 'actions/picker'
import { shuffle } from 'lodash'
import Slick from 'react-slick'
import styles from './styles'

@connect(state => ({
  selected: new Set(state.picker),
}), {
  pickImage: onImagePick,
  unpickImage: onImageUnpick,
})
class Slider extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    imagesPerSlide: PropTypes.number,
    imagesLimit: PropTypes.number,
    selected: PropTypes.object,
    pickImage: PropTypes.func,
    unpickImage: PropTypes.func,
  }

  static defaultProps = {
    imagesPerSlide: 4,
    imagesLimit: 40,
  }

  handleClick(img) {
    const { selected, pickImage, unpickImage } = this.props
    if (selected.has(img)) {
      unpickImage(img)
    } else {
      pickImage(img)
    }
  }

  renderSlides() {
    const res = []
    const { images, imagesPerSlide, imagesLimit, selected } = this.props
    const slidesNumber = imagesLimit / imagesPerSlide
    if (!this.images && images.length) {
      this.images = shuffle(images).slice(0, imagesLimit)
    }

    for (let i = 0, j = 0; i < slidesNumber; i++, j += imagesPerSlide) {
      res.push(
        <div className={styles.slide} key={j}>
          {this.images.slice(j, j + imagesPerSlide).map(img => (
            <img
              key={img.id}
              src={img.url}
              className={selected.has(img) ? styles.selectedSlide : styles.slide}
              onClick={this.handleClick.bind(this, img)}
            />
          ))}
        </div>
      )
    }
    return res
  }

  render() {
    const settings = {
      dots: true,
      speed: 500,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      className: styles.slider,
      draggable: false,
      prevArrow: false,
      // slickGoTo: this.props.reset ? 1 : null,
      // slickGoTo: 1,
    }

    return (
      <Slick {...settings}>
        {this.renderSlides()}
      </Slick>
    )
  }
}

export default Slider
