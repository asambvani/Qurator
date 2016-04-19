import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as pickerActions from 'actions/picker'
import * as imagesActions from 'actions/images'
import { createSelector } from 'reselect'
import { toArray, orderBy } from 'lodash'
import autobind from 'autobind-decorator'
import { Grid, Button } from 'react-bootstrap'
import Showcase from 'components/Showcase'
import Picker from './Picker'
import GetStarted from './GetStarted'
import config from 'services/config'
import { currentTags as currentTagsSelector } from 'selectors'
import styles from './styles'

const { picker: { maxSteps } } = config
const selector = createSelector(
  [
    state => state.entities.images,
    state => state.qurator.step,
    state => state.qurator.picker.imageIds,
    state => state.qurator.picker.selectedIds,
    state => state.qurator.selectedImages,
    state => state.qurator.resultFromServer,
    currentTagsSelector,
  ],
  (
    images, step, pickerImageIds, pickerSelectedIds, selectedImages,
    resultFromServer, currentTags
  ) => ({
    images: orderBy(toArray(images), 'weight', 'desc'),
    step,
    picker: {
      images: pickerImageIds.map(id => images[id]),
      selectedIds: pickerSelectedIds,
    },
    selectedImages,
    resultFromServer: resultFromServer.map(id => images[id]),
    currentTags,
  })
)

@connect(selector, { ...pickerActions, ...imagesActions })
class Qurate extends Component {
  static propTypes = {
    resetPicker: PropTypes.func.isRequired,
    filterImagesByTags: PropTypes.func.isRequired,
    imagesForPicker: PropTypes.func.isRequired,
    pickImage: PropTypes.func.isRequired,
    unpickImage: PropTypes.func.isRequired,
    images: PropTypes.array.isRequired,
    step: PropTypes.number.isRequired,
    selectedImages: PropTypes.array.isRequired,
    currentTags: PropTypes.object.isRequired,
    picker: PropTypes.shape({
      images: PropTypes.array.isRequired,
      selectedIds: PropTypes.array.isRequired,
    }),
    resultFromServer: PropTypes.array.isRequired,
  }

  @autobind
  resetPickerClick() {
    this.props.resetPicker()
  }

  @autobind
  showNextPickerClick() {
    const {
      selectedImages,
      imagesForPicker,
      filterImagesByTags,
      currentTags,
    } = this.props

    imagesForPicker(selectedImages)
    filterImagesByTags(currentTags)
  }

  render() {
    const {
      resetPickerClick,
      showNextPickerClick,
      props: {
        pickImage,
        unpickImage,
        step,
        picker,
        resultFromServer,
      },
    } = this

    const pickerActive = step > 0 && step <= maxSteps
    const restartButton = step === 0 ?
      <GetStarted
        btnClass={styles.startButton}
        handleStartClick={showNextPickerClick}
      />
      :
      <Button
        className={styles.startButton}
        bsStyle="primary"
        bsSize="large"
        onClick={resetPickerClick}
      >
        Start over
      </Button>

    return (
      <div className="container">
        <Grid>
          <div className="text-center">
            <h3 className={styles.take}>
              Take our <br /><span className={styles.takeQ}>quiz</span>
            </h3>
            <div className={styles.separatorQ}></div>
            <ul className={styles.steps}>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
            </ul>
            {
              pickerActive &&
              <div>Step {step} of {maxSteps}</div>
            }
          </div>
          <div className={styles.buttonBar}>
            {
              pickerActive ?
              <div>
                <Button
                  bsStyle="danger"
                  className={styles.reset}
                  onClick={resetPickerClick}
                >
                  Start over
                </Button>
                <Button
                  bsStyle="primary"
                  className={styles.next}
                  onClick={showNextPickerClick}
                >
                  Next
                </Button>
              </div>
              :
              restartButton
            }
          </div>
          {
            pickerActive &&
            <Picker {...{ pickImage, unpickImage, picker }} />
          }
        </Grid>
        {
          (step > maxSteps) &&
          <Showcase {...{ images: resultFromServer }} />
        }
      </div>
    )
  }
}

export default Qurate
