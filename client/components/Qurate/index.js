import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { toArray, orderBy } from 'lodash'
import { Grid } from 'react-bootstrap'
import autobind from 'autobind-decorator'
import cn from 'classnames'
import { currentTags as currentTagsSelector } from 'selectors'
import * as pickerActions from 'actions/picker'
import * as imagesActions from 'actions/images'
import * as qurateActions from 'actions/qurate'
import GetStarted from './GetStarted'
import Picker from './Picker'
import EmailForm from './EmailForm'
import Showcase from 'components/Showcase'
import config from 'services/config'
import styles from './styles'

const { picker: { maxSteps } } = config
const selector = createSelector(
  [
    state => state.entities.images,
    state => state.qurator.step,
    state => state.qurator.picker.step,
    state => state.qurator.picker.imageIds,
    state => state.qurator.picker.selectedIds,
    state => state.qurator.selectedImages,
    state => state.qurator.resultFromServer,
    currentTagsSelector,
  ],
  (
    images, qurateStep, pickerStep, pickerImageIds, pickerSelectedIds, selectedImages,
    resultFromServer, currentTags
  ) => ({
    qurateStep,
    pickerStep,
    currentTags,
    selectedImages,
    images: orderBy(toArray(images), 'weight', 'desc'),
    resultFromServer: resultFromServer.map(id => images[id]),
    picker: {
      images: pickerImageIds.map(id => images[id]),
      selectedIds: pickerSelectedIds,
    },
  })
)

@connect(selector, { ...pickerActions, ...imagesActions, ...qurateActions })
class Qurate extends Component {
  static propTypes = {
    qurateStep: PropTypes.number.isRequired,
    pickerStep: PropTypes.number.isRequired,
    resetPicker: PropTypes.func.isRequired,
    stepForward: PropTypes.func.isRequired,
    filterImagesByTags: PropTypes.func.isRequired,
    imagesForPicker: PropTypes.func.isRequired,
    pickImage: PropTypes.func.isRequired,
    unpickImage: PropTypes.func.isRequired,
    images: PropTypes.array.isRequired,
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
  showNextPicker() {
    const { selectedImages, imagesForPicker } = this.props
    imagesForPicker(selectedImages)
  }

  @autobind
  moveQurateForward() {
    this.props.stepForward()
    this.showNextPicker()
  }

  render() {
    const {
      resetPickerClick,
      showNextPicker,
      moveQurateForward,
      props: {
        pickImage,
        unpickImage,
        qurateStep,
        pickerStep,
        picker,
        resultFromServer,
      },
    } = this

    const content = [
      <GetStarted
        handleStartClick={moveQurateForward}
      />,
      <Picker
        {...{ pickImage, unpickImage, picker }}
        currentStep={pickerStep}
        handleNextClick={pickerStep === maxSteps ? moveQurateForward : showNextPicker}
      />,
      <EmailForm />,
      <Picker {...{ pickImage, unpickImage, picker }} />,
    ]

    return (
      <div className="container">
        <Grid>
          <div className="text-center">
            <h3 className={styles.take}>
              Take our <br /><span className={styles.takeQ}>quiz</span>
            </h3>
            <div className={styles.separatorQ}></div>
            <ul className={styles.steps}>
              {content.map((c, i) => (
                <li key={i} className={cn({ active: i === qurateStep })}>
                  {i + 1}
                </li>
              ))}
            </ul>
            {content[qurateStep]}
          </div>
        </Grid>
      </div>
    )
  }
}

export default Qurate

        // {
        //   (pickerStep > maxSteps) &&
        //   <Showcase {...{ images: resultFromServer }} />
        // }

        // <div className={styles.buttonBar}>
        //   {
        //     pickerActive ?
        //     <div>
        //       <Button
        //         bsStyle="danger"
        //         className={styles.reset}
        //         onClick={resetPickerClick}
        //       >
        //         Start over
        //       </Button>
        //       <Button
        //         bsStyle="primary"
        //         className={styles.next}
        //         onClick={showNextPicker}
        //       >
        //         Next
        //       </Button>
        //     </div>
        //     :
        //     restartButton
        //   }
        // </div>
        // {
        //   pickerActive &&
        // }
        //
