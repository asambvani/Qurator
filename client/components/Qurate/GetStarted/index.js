import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import styles from 'styles'

const GetStarted = ({ handleStartClick }) => (
  <div>
    <p>
      Our algorithm will
      suggest 15 photos that
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
