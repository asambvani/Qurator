import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import styles from './styles'

class Contacts extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={4} className={styles.address}>
            <h2>Contact</h2>
            <p>
              Harvard Business School
              <br />
              Boston, MA
              <br />
              Tel : 000.000.0000
              <br />
              E-mail: <a href="mailto:info@qurator-art.com">info@qurator-art.com</a>
            </p>
          </Col>
          <Col md={8} className={styles.map}>
            <h2>Map</h2>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Contacts
