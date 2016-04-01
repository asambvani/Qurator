import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import { Grid, Row } from 'react-bootstrap'
import ImageModal from 'components/ImageModal'
import ImageTumbnailShowsModalOnClick from './ImageTumbnailShowsModalOnClick'


class Showcase extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
  }

  state = {
    image: {},
    showModal: false,
  }

  @autobind
  showModal(image) {
    this.setState({
      image,
      modalShown: true,
    })
  }

  @autobind
  hideModal() {
    this.setState({ modalShown: false })
  }

  render() {
    const {
      hideModal, showModal,
      props: { images },
      state: { modalShown, image },
    } = this

    return (
      <Grid fluid >
        <ImageModal
          image={image}
          isActive={modalShown}
          onClose={hideModal}
        />
        <Row>
          {images.map(img => (
            <ImageTumbnailShowsModalOnClick
              key={img.id}
              image={img}
              showModal={showModal}
            />
          ))}
        </Row>
      </Grid>
    )
  }
}

export default Showcase
