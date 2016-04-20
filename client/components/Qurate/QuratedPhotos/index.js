import React, { PropTypes } from 'react'
import { Grid, Row } from 'react-bootstrap'
import Showcase from 'components/Showcase'

const QuratedPhotos = ({ images }) => (
  <Grid>
    <Row>
      <h3>Here are the photos we've qurated just for you</h3>
      <Showcase {...{ images }} />
    </Row>
  </Grid>
)

QuratedPhotos.propTypes = {
  images: PropTypes.array.isRequired,
}

export default QuratedPhotos
