import React, { PropTypes } from 'react'
import { Grid, Row } from 'react-bootstrap'
import Showcase from 'components/Showcase'
import styles from './styles'

const Result = ({ images, name, handleRestartClick }) => (
  <Grid>
    <Row>
      <h3 className={styles.yourPhoto}>
        {name ? `${name},` : ''} here are the photos <br />
        we've qurated <span className={styles.justFor}>just for you</span>
      </h3>
      <a className={styles.skip} onClick={handleRestartClick}>
        Restart the Quiz
      </a>
      <Showcase {...{ images }} />
    </Row>
  </Grid>
)

Result.propTypes = {
  images: PropTypes.array.isRequired,
  handleRestartClick: PropTypes.func.isRequired,
  name: PropTypes.string,
}

export default Result
