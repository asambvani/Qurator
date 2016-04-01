import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { Grid, Row } from 'react-bootstrap'
import { resetPicker } from 'actions/picker'
import ImageModal from 'components/ImageModal'
import ImageTumbnailShowsModalOnClick from './ImageTumbnailShowsModalOnClick'
import { createStructuredSelector } from 'reselect'
import _ from 'lodash'

const selector = createStructuredSelector({
  images: state => _.toArray(state.entities.images),
})

@connect(selector, { resetPicker })
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
        <Row>
          {images.map(img => (
            <ImageTumbnailShowsModalOnClick
              key={img.id}
              image={img}
              showModal={showModal}
            />
          ))}
          <ImageModal
            image={image}
            active={modalShown}
            onClose={hideModal}
          />
        </Row>
      </Grid>
    )
  }
}

export default Showcase
