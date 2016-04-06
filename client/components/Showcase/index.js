import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import { Grid, Row, Col } from 'react-bootstrap'
import ImageModal from 'components/ImageModal'
import ImageTumbnailShowsModalOnClick from './ImageTumbnailShowsModalOnClick'

class Showcase extends Component {
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
      <Grid fluid >
        <ImageModal
          currentIndex={imageIndex}
          image={images[imageIndex]}
          isActive={modalShown}
          onClose={hideModal}
          imagesCount={images.length}
          handleNextClick={this.handleNextClick}
          handlePrevClick={this.handlePrevClick}
        />
        <Row>
          {images.map((img, i) => (
            <Col md={4} key={img.id}>
              <ImageTumbnailShowsModalOnClick
                key={img.id}
                index={i}
                image={img}
                showModal={showModal}
              />
            </Col>
          ))}
        </Row>
      </Grid>
    )
  }
}

export default Showcase
