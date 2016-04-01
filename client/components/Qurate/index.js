import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { Grid, Button } from 'react-bootstrap'
import { resetPicker, showNextPicker } from 'actions/picker'
import Picker from './Picker'
import Showcase from './Showcase'
import styles from './styles'

@connect(null, { resetPicker, showNextPicker })
class Qurate extends Component {
  static propTypes = {
    resetPicker: PropTypes.func,
    showNextPicker: PropTypes.func,
  }

  @autobind
  handleResetClick() {
    this.props.resetPicker()
  }

  @autobind
  handleNextClick() {
    this.props.showNextPicker()
  }

  render() {
    return (
      <div className="container" >
        <Grid>
          <div className={styles.textHolder} >
            <h3>Picker</h3>
            <div>Pick images you like</div>
          </div>
          <div className={styles.buttonBar} >
            <Button
              bsStyle="danger"
              className={styles.reset}
              onClick={this.handleResetClick}
            >
              Reset
            </Button>
            <Button
              bsStyle="primary"
              className={styles.next}
              onClick={this.handleNextClick}
            >
              Next
            </Button>
          </div>

          <Picker />
        </Grid>
        <Showcase />
      </div>
    )
  }
}

export default Qurate
