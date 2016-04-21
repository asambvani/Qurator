import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { throttle } from 'lodash'
import { Grid, Row } from 'react-bootstrap'
import { createStructuredSelector } from 'reselect'
import { filterImagesByForm } from 'actions/images'
import Showcase from 'components/Showcase'
import Filter from './Filter'

const selector = createStructuredSelector({
  images: state => state.imagesFilter.ids.map(id => state.entities.images[id]),
})

@connect(selector, { filterImagesByForm })
class Shop extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    filterImagesByForm: PropTypes.func.isRequired,
    tags: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.state = { filter: {} }
    this.debouncedFilterImagesByForm = throttle(props.filterImagesByForm, 1000)
  }

  componentDidMount() {
    this.debouncedFilterImagesByForm()
  }

  @autobind
  applyFilter(options) {
    this.props.filterImagesByForm(options)
    // this.debouncedFilterImagesByForm(options)
  }

  render() {
    const { images } = this.props

    return (
      <Grid>
        <Row>
          <br />
          <Filter applyFilter={this.applyFilter} />
          <Showcase {...{ images } } />
        </Row>
      </Grid>
    )
  }
}

export default Shop
