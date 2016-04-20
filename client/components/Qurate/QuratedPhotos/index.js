import React, { PropTypes } from 'react'
import { Grid, Row } from 'react-bootstrap'
import Showcase from 'components/Showcase'
import styles from './styles'

const QuratedPhotos = ({ images }) => (
  <Grid>
    <Row>
      <h3 className={styles.yourPhoto}>Here are the photos <br />
      we've qurated <span className={styles.justFor}>just for you</span></h3>
      <Showcase {...{ images }} />
    </Row>
  </Grid>
)

QuratedPhotos.propTypes = {
  images: PropTypes.array.isRequired,
}

export default QuratedPhotos
