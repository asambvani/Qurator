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

  @autobind
  handleNextClick() {
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

          <Slider {...this.props} />
        </Grid>
        <Showcase />
      </div>
    )
  }
}

export default Picker
