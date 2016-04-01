import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as pickerActions from 'actions/picker'
import { createSelector } from 'reselect'
import { shuffle, toArray, orderBy } from 'lodash'
import autobind from 'autobind-decorator'
import { Grid, Button } from 'react-bootstrap'
import Picker from './Picker'
import Showcase from './Showcase'
import styles from './styles'

const selector = createSelector(
  [
    state => state.entities.images,
    state => state.picker,
    state => state.currentPicker,
  ],
  (images, picker, currentPicker) => ({
    images: orderBy(toArray(images), 'weight', 'desc'),
    currentPicker: currentPicker.map(id => images[id]),
    selected: new Set(picker),
  }))

@connect(
  selector,
  pickerActions
)
class Qurate extends Component {
  static propTypes = {
    resetPicker: PropTypes.func.isRequired,
    showNextPicker: PropTypes.func.isRequired,
    pickImage: PropTypes.func.isRequired,
    unpickImage: PropTypes.func.isRequired,
    images: PropTypes.array,
    selected: PropTypes.object.isRequired,
    currentPicker: PropTypes.array.isRequired,
  }

  @autobind
  handleResetClick() {
    this.props.resetPicker()
  }

  @autobind
  handleNextClick() {
    const { props: { images, selected, showNextPicker } } = this
    const notSeletedImages = toArray(images)
      .map(image => image.id)
      .filter(id => !selected.has(id))
    showNextPicker(shuffle(notSeletedImages).slice(0, 4))
  }

  render() {
    const {
      handleResetClick,
      handleNextClick,
      props: { pickImage, unpickImage, selected, currentPicker, images },
    } = this
    return (
      <div className="container" >
        <Grid>
          <div className={styles.textHolder} >
            <h3>Picker</h3>
            <div>Pick images you like</div>
          </div>
          <div className={styles.buttonBar} >
            {currentPicker.length ?
              <div>
                <Button
                  bsStyle="danger"
                  className={styles.reset}
                  onClick={handleResetClick}
                >
                  Start over
                </Button>
                <Button
                  bsStyle="primary"
                  className={styles.next}
                  onClick={handleNextClick}
                >
                  Next
                </Button>
              </div>
              :
              <Button
                className={styles.startButton}
                bsStyle="primary"
                bsSize="large"
                onClick={handleNextClick}
              >
                Start
              </Button>
            }
          </div>

          <Picker {...{ pickImage, unpickImage, selected, currentPicker, handleNextClick }} />
        </Grid>
        <Showcase {...{ images } } />
      </div>
    )
  }
}

export default Qurate
