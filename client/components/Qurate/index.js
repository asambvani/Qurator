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
import styles from './styles'
import config from '../../services/config'
const { picker: { maxSteps } } = config
import { currentTags as currentTagsSelector } from '../../selectors'
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
      props: {
        selectedImages,
        imagesForPicker,
        filterImagesByTags,
        currentTags,
      },
    } = this
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
      <Button
        className={styles.startButton}
        bsStyle="primary"
        bsSize="large"
        onClick={ showNextPickerClick }
      >
        Start
      </Button>
      :
      <Button
        className={styles.startButton}
        bsStyle="primary"
        bsSize="large"
        onClick={ resetPickerClick }
      >
        Start over
      </Button>

    return (
      <div className="container" >
        <Grid>
          <div className="text-center" >
            <h3>Picker</h3>
            <div>Pick images you like</div>
            {pickerActive && <div>Step {step} of {maxSteps}</div>}
          </div>
          <div className={styles.buttonBar} >
            {pickerActive ?
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
          {pickerActive && <Picker {...{
            pickImage,
            unpickImage,
            picker,
          }}
          />}
        </Grid>
        <Showcase {...{ images: resultFromServer } } />
        <hr />
        <div className={styles.socialBar} >
          <a
            className="btn btn-social-icon btn-lg btn-facebook"
            href="https://www.facebook.com/quratorart/"
          >
            <i className="fa fa-facebook" />
          </a>
          <a
            className="btn btn-social-icon btn-lg btn-instagram"
            href="https://www.instagram.com/qurator_art/"
          >
            <i className="fa fa-instagram" />
          </a>
        </div>

      </div>
    )
  }
}

export default Qurate
