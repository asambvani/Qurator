import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
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

  state = {
    filter: {},
  }

  @autobind
  applyFilter(options) {
    this.props.filterImagesByForm(options)
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
