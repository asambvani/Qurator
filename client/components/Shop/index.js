import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { Grid, Row } from 'react-bootstrap'
import { createStructuredSelector } from 'reselect'
import { loadImages as filterAction } from 'actions/images'
import Showcase from 'components/Showcase'
import Filter from './Filter'

const selector = createStructuredSelector({
  images: state => state.imagesFilter.ids.map(id => state.entities.images[id]),
})

@connect(selector, { filterImages: filterAction })
class Shop extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    filterImages: PropTypes.func,
    tags: PropTypes.array,
  }

  state = {
    filter: {},
  }

  @autobind
  applyFilter(options) {
    this.props.filterImages(options, '/filter')
  }

  render() {
    const { images } = this.props

    return (
      <Grid>
        <Row>
          <div className="text-center" >
            <h3>Shop entire store</h3>
            <div>Find images you like</div>
          </div>
          <br />
          <Filter
            applyFilter={this.applyFilter}
          />
          <Showcase {...{ images } } />
        </Row>
      </Grid>
    )
  }
}

export default Shop
