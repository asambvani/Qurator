import { createReducer } from 'redux-act'
import { combineReducers } from 'redux'
import without from 'lodash/without'
import initialState from 'services/initialState'
import { showNextPicker, resetPicker, pickImage, unpickImage } from 'actions/picker'
import { imagesPickerActions } from 'actions/images'

const initSelectedIds = initialState.qurator.picker.selectedIds
const initImageIds = initialState.qurator.picker.imageIds

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

export default combineReducers({
  selectedIds,
  imageIds,
})
