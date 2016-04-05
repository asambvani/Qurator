import React, { Component, PropTypes } from 'react'
import styles from './styles'
import classnames from 'classnames'


class Tag extends Component {
  static propTypes = {
    tag: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    maxWeight: PropTypes.number.isRequired,
  }

  render() {
    const { props: { tag, weight, maxWeight } } = this
    const opacity = weight / maxWeight
    return (
      <span
        style={ { opacity } }
        className={classnames(styles.tag, 'label label-primary')}
      >
        {tag}
    </span>
    )
  }
}

export default Tag
