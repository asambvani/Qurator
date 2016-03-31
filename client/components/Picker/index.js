import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { Grid, Button } from 'react-bootstrap'
import { resetPicker } from 'actions/picker'
import Slider from './Slider'
import Showcase from './Showcase'
import styles from './styles'

@connect(null, { resetPicker })
class Picker extends Component {
  static propTypes = {
    resetPicker: PropTypes.func,
  }

  @autobind
  handleResetClick() {
    this.props.resetPicker()
  }

  render() {
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
          <Slider {...this.props} />
        </Grid>
        <Showcase />
      </div>
    )
  }
}

export default Picker
