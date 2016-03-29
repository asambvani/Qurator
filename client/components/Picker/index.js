import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { currentTags, currentImages } from 'selectors'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { shuffle } from 'lodash'
import { resetPicker } from 'actions/picker'
import Slider from './Slider'
import styles from './styles'

@connect(
state => ({
  images: currentImages(state),
  tags: currentTags(state),
}), { resetPicker })
class Picker extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    tags: PropTypes.object,
    resetPicker: PropTypes.func,
  }

  @autobind
  handleResetClick() {
    this.props.resetPicker()
  }

  render() {
    const { images, tags } = this.props
    let filteredImages = images

    if (tags.size) {
      filteredImages = images.filter(img => (
        img.tags.some(tag => tags.has(tag))
      ))
    }

    return (
      <div>
        <Grid>
          <h3>Picker</h3>
          <Button
            bsStyle="primary"
            className={styles.reset}
            onClick={this.handleResetClick}
          >
            Reset
          </Button>
          {images.length ? <Slider {...this.props} /> : null}
        </Grid>
        <Grid fluid>
          <Row>
            {shuffle(filteredImages).map(img => (
              <Col
                xs={3}
                md={2}
                lg={1}
                key={img.id}
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
