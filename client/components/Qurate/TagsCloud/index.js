import React, { Component, PropTypes } from 'react'
import Tag from './Tag'
import map from 'lodash/map'
import styles from './styles'
import max from 'lodash/max'
import toArray from 'lodash/toArray'

class TagsCloud extends Component {
  static propTypes = {
    selectedTags: PropTypes.object.isRequired,
  }

  render() {
    const { selectedTags } = this.props
    const maxWeight = max(toArray(selectedTags))
    return (
      <div className={styles.tags}>
        {map(selectedTags, (weight, tag) =>
          <Tag {...{ tag, weight, maxWeight, key: tag }} />
        )}
      </div>
    )
  }
}

export default TagsCloud
