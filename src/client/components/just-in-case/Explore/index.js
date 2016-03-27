import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'

class Explore extends Component {
  static propTypes = {
    handleChange: PropTypes.func,
    value: PropTypes.string,
  }

  @autobind
  onKeyUp(e) {
    if (e.keyCode === 13) {
      this.handleGoClick()
    }
  }

  getInputValue() {
    return this.refs.input.value
  }

  @autobind
  handleGoClick() {
    this.props.handleChange(this.getInputValue())
  }

  render() {
    return (
      <div>
      Input Github username you wanna explore:
      <br />
      <input
        type="text"
        size="45"
        ref="input"
        defaultValue={this.props.value}
        onKeyUp={this.onKeyUp}
      />
      <button onClick={this.handleGoClick}>Go</button>
      </div>
    )
  }
}

export default Explore
