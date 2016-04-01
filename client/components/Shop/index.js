import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { Grid, Row } from 'react-bootstrap'
import { createStructuredSelector } from 'reselect'
import _ from 'lodash'

const selector = createStructuredSelector({
  images: state => _.toArray(state.entities.images),
})

@connect(selector)
class Shop extends Component {
  render() {
    return (
      <Grid>
        <Row>
          Shop
        </Row>
      </Grid>
    )
  }
}

export default Shop
