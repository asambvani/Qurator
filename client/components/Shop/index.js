import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { Button, Grid, Row } from 'react-bootstrap'
import { createStructuredSelector } from 'reselect'
import _ from 'lodash'
import Showcase from 'components/Showcase'
import Filter from './Filter'
import styles from './styles'

const selector = createStructuredSelector({
  images: state => _.toArray(state.entities.images),
})

@connect(selector)
class Shop extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
  }

  state = {
    filter: {},
  }

  @autobind
  handleSearch() {
    console.log('filter')
    // this.props.filterImages()
  }

  render() {
    // filter: url,title,description,artist,artistBio,tags,scene
    const { images } = this.props

    return (
      <Grid>
        <Row>
          <div className="text-center">
            <h3>Shop entire store</h3>
            <div>Find images you like</div>
          </div>
          <br />
          <Filter
            handleSearchClick={this.handleSearch}
          />
          <Showcase {...{ images } } />
        </Row>
      </Grid>
    )
  }
}

export default Shop
