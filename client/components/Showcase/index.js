import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import ImageModalHandler from 'components/ImageModalHandler'
import ImageTumbnailShowsModalOnClick from './ImageTumbnailShowsModalOnClick'

@ImageModalHandler
class Showcase extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    showModal: PropTypes.func.isRequired,
  }

  render() {
    const {
      props: { images, showModal },
    } = this

    return (
      <Grid fluid >
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
