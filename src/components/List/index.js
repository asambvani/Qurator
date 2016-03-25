import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { addToList, removeFromList } from 'actions/list'

class List extends Component {
  static propTypes = {
    ItemComponent: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    add: PropTypes.func,
    remove: PropTypes.func,
  }

  onCounterDeleteClick(index) {
    return () => this.props.remove(index)
  }

  @autobind
  renderItem(item, index) {
    const { ItemComponent } = this.props

    return (
      <div key={index}>
        <ItemComponent
          index={index}
          value={item.value}
        />
        <button onClick={this.onCounterDeleteClick(index)}>Delete</button>
      </div>
    )
  }

  render() {
    const { items, add, remove } = this.props

    return (
      <div>
        <button onClick={add}>Add</button>
        <button onClick={remove}>Delete</button>
        {items.map(this.renderItem)}
      </div>
    )
  }
}

export default connect(null, {
  add: addToList,
  remove: removeFromList,
})(List)
