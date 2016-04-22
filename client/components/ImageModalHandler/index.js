import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import ImageModal from 'components/ImageModal'

const ImageModalHandler = WrappedComponent => class extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
  }

  state = {
    image: 0,
    showModal: false,
  }

  @autobind
  showModal(imageIndex) {
    this.setState({
      imageIndex,
      modalShown: true,
    })
  }

  @autobind
  hideModal() {
    this.setState({ modalShown: false })
  }

  @autobind
  handleNextClick() {
    this.setState({ imageIndex: this.state.imageIndex + 1 })
  }

  @autobind
  handlePrevClick() {
    this.setState({ imageIndex: this.state.imageIndex - 1 })
  }

  render() {
    const {
      hideModal, showModal,
      props: { images },
      state: { modalShown, imageIndex },
    } = this

    return (
      <div>
        <ImageModal
          currentIndex={imageIndex}
          image={images[imageIndex]}
          isActive={modalShown}
          onClose={hideModal}
          imagesCount={images.length}
          handleNextClick={this.handleNextClick}
          handlePrevClick={this.handlePrevClick}
        />
        <WrappedComponent
          {...this.props}
          showModal={showModal}
        />
      </div>
    )
  }
}

export default ImageModalHandler
