import React, { Component, PropTypes } from 'react'
// import autobind from 'autobind-decorator'
import Slick from 'react-slick'
import styles from './styles'

class Slider extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    imagesPerSlide: PropTypes.number,
  }

  static defaultProps = {
    imagesPerSlide: 4,
  }

  constructor() {
    super()
    this.state = { selected: new Set() }
  }

  handleClick(img) {
    const { selected } = this.state

    if (selected.has(img)) {
      selected.delete(img)
      this.forceUpdate()
    } else {
      this.setState({ selected: selected.add(img) })
    }
  }

  renderSlides() {
    const res = []
    const { selected } = this.state
    const { images, imagesPerSlide } = this.props
    const slidesNumber = images.length / imagesPerSlide

    for (let i = 0, j = 0; i < slidesNumber; i++, j += imagesPerSlide) {
      res.push(
        <div className={styles.slide} key={j}>
          {images.slice(j, j + imagesPerSlide).map(img => (
            <img
              key={img.url}
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
    }

    return (
      <Slick {...settings}>
        {this.renderSlides()}
      </Slick>
    )
  }
}

export default Slider
