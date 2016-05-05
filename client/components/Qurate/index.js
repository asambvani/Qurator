import React, { Component, PropTypes } from 'react'
import { createSelector } from 'reselect'
import { toArray, orderBy } from 'lodash'
import { Grid } from 'react-bootstrap'
import autobind from 'autobind-decorator'
import { currentTags as currentTagsSelector } from 'selectors'
import * as pickerActions from 'actions/picker'
import * as imagesActions from 'actions/images'
import * as qurateActions from 'actions/qurate'
import GetStarted from './GetStarted'
import Picker from './Picker'
import EmailForm from './EmailForm'
import Result from './Result'
import { reduxForm } from 'redux-form'
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

@reduxForm({
  form: 'qurate-email',
  fields: ['name', 'email'],
}, selector, { ...pickerActions, ...imagesActions, ...qurateActions })
class Qurate extends Component {
  static propTypes = {
    qurateStep: PropTypes.number.isRequired,
    pickerStep: PropTypes.number.isRequired,
    restartQuiz: PropTypes.func.isRequired,
    resetPicker: PropTypes.func.isRequired,
    stepForward: PropTypes.func.isRequired,
    filterImagesByTags: PropTypes.func.isRequired,
    imagesForPicker: PropTypes.func.isRequired,
    pickImage: PropTypes.func.isRequired,
    unpickImage: PropTypes.func.isRequired,
    images: PropTypes.array.isRequired,
    selectedImages: PropTypes.array.isRequired,
    currentTags: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    picker: PropTypes.shape({
      images: PropTypes.array.isRequired,
      selectedIds: PropTypes.array.isRequired,
    }),
    resultFromServer: PropTypes.array.isRequired,
  }

  @autobind
  getStarted() {
    this.showNextPicker()
    this.moveQurateForward()
  }

  allPickerImages = []

  @autobind
  showNextPicker() {
    const { imagesForPicker, picker: { images } } = this.props
    const pickerImages = images.map(({ id }) => id)
    this.allPickerImages = this.allPickerImages.concat(pickerImages)
    imagesForPicker(this.allPickerImages)
  }

  @autobind
  moveQurateForward() {
    const { stepForward, qurateStep, filterImagesByTags, currentTags } = this.props
    if (qurateStep === 2) {
      filterImagesByTags(currentTags)
    }
    stepForward()
  }

  @autobind
  restartQuiz() {
    this.props.resetPicker()
    this.showNextPicker()
    this.props.restartQuiz()
  }

  render() {
    const {
      getStarted,
      showNextPicker,
      moveQurateForward,
      props: {
        pickImage,
        unpickImage,
        qurateStep,
        pickerStep,
        picker,
        resultFromServer,
        fields,
        values,
      },
    } = this

    const content = [
      <GetStarted
        handleStartClick={getStarted}
      />,
      <Picker
        {...{ pickImage, unpickImage, picker }}
        currentStep={pickerStep}
        handleNextClick={pickerStep === maxSteps ? moveQurateForward : showNextPicker}
      />,
      <EmailForm
        fields={fields}
        handleRestartClick={this.restartQuiz}
        handleSubmitClick={moveQurateForward}
      />,
      <Result
        name={values.name}
        handleRestartClick={this.restartQuiz}
        {...{ images: resultFromServer }}
      />,
    ]

    return (
        <Grid className={styles.qurateContainer}>
          <div className="text-center">
            {content[qurateStep]}
          </div>
        </Grid>
    )
  }
}

export default Qurate
