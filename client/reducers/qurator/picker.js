import { createReducer } from 'redux-act'
import { combineReducers } from 'redux'
import without from 'lodash/without'
import initialState from 'services/initialState'
import { showNextPicker, resetPicker, pickImage, unpickImage } from 'actions/picker'
import { imagesPickerActions } from 'actions/images'

const { picker: initPicker } = initialState.qurator
const initSelectedIds = initPicker.selectedIds
const initImageIds = initPicker.imageIds
const initStep = initPicker.step

const selectedIds = createReducer({
  [pickImage]: (state, id) => [...state, id],
  [unpickImage]: (state, id) => without(state, id),
  [showNextPicker]: () => initSelectedIds,
  [resetPicker]: () => initSelectedIds,
}, initSelectedIds)

const imageIds = createReducer({
  [imagesPickerActions.success]: (state, { result }) => result, // eslint-disable-line
  [resetPicker]: () => initImageIds,
}, initImageIds)

const step = createReducer({
  [imagesPickerActions.success]: (state) => state + 1,
  [resetPicker]: () => initStep,
}, initStep)

export default combineReducers({
  step,
  selectedIds,
  imageIds,
})
