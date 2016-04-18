import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import styles from './styles'

const GetStarted = ({ handleStartClick }) => (
  <div className={styles.getStartedD}>
    <p className={styles.ourA}>
      Our algorithm will
      suggest <span className={styles.ourAyellow}>15 photos</span> that
      match your style
    </p>
    <Button
      className={styles.startButton}
      bsStyle="primary"
      bsSize="large"
      onClick={handleStartClick}
    >
      Get started
    </Button>
  </div>
)

GetStarted.propTypes = {
  handleStartClick: PropTypes.func.isRequired,
}

export default GetStarted
