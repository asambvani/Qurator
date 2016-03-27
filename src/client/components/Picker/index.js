import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import Slider from './slider'
import styles from './styles'

@connect(state => ({
  images: state.images,
}))
class Picker extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
  }

  render() {
    return (
      <div>
        <Grid>
          <h3>Picker</h3>
          <Slider {...this.props} />
        </Grid>
        <Grid fluid>
          <Row>
            {this.props.images.map(img => (
              <Col
                xs={4}
                md={3}
                lg={2}
                key={img.url}
              >
                <img className={styles.image} src={img.url} />
              </Col>
            ))}
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Picker
