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


@connect(
  selector,
  { resetPicker })
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
      showModal: true,
    })
  }

  @autobind
  hideModal() {
    this.setState({ showModal: false })
  }

  render() {
    const { images } = this.props

    return (
      <Grid fluid >
        <Row>
          {images.map(image => (
            <ImageTumbnailShowsModalOnClick image={image} showModal={this.showModal} />
          ))}
          <ImageModal
            image={this.state.image}
            active={this.state.showModal}
            onClose={this.hideModal}
          />
        </Row>
      </Grid>
    )
  }
}

export default Showcase
