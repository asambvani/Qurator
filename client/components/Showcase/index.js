import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ImageModalHandler from 'components/ImageModalHandler'
import ImageTumbnailShowsModalOnClick from './ImageTumbnailShowsModalOnClick'

@ImageModalHandler
class Showcase extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    showModal: PropTypes.func.isRequired,
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

  render() {
    const { images, showModal } = this.props

    return (
      <Grid fluid >
        <Row>
          {images.map((img, i) => (
            <Col md={4} key={img.id} sm={6} xs={6}>
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
