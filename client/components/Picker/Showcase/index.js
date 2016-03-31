import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { currentImages } from 'selectors'
import { Grid, Row, Col } from 'react-bootstrap'
import { resetPicker } from 'actions/picker'
import ImageModal from 'components/shared/ImageModal'
import styles from './styles'

@connect(
state => ({
  images: currentImages(state),
}), { resetPicker })
class Showcase extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
  }

  state = {
    image: {},
    showModal: false,
  }

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
    // let filteredImages = images
    //
    // if (Object.keys(tags).length) {
    //   // console.log('Selected tags: ', tags)
    //   filteredImages = images.filter(img => (
    //     img.tags.some(tag => tags[tag])
    //   ))
    // }

    return (
      <Grid fluid>
        <Row>
          {images.map(img => (
            <Col
              xs={3}
              md={2}
              lg={1}
              key={img.id}
            >
              <img
                className={styles.image}
                src={`/img/thumb/${img.url}`}
                onClick={this.showModal.bind(this, img)}
              />
            </Col>
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
