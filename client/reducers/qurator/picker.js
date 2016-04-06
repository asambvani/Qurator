import { createReducer } from 'redux-act'
import { combineReducers } from 'redux'
import initialState from '../../services/initialState'
import without from 'lodash/without'
import { showNextPicker, resetPicker, pickImage, unpickImage } from '../../actions/picker'
const initSelectedIds = initialState.qurator.picker.selectedIds
const initImageIds = initialState.qurator.picker.imageIds
import { types } from '../../actions/images'

const selectedIds = createReducer({
  [pickImage]: (state, id) => [...state, id],
  [unpickImage]: (state, id) => without(state, id),
  [showNextPicker]: () => initSelectedIds,
  [resetPicker]: () => initSelectedIds,
}, initSelectedIds)

const imageIds = createReducer({
  [types.imagesForPicker.success]: (state, {result}) => result, // eslint-disable-line
  [resetPicker]: () => initImageIds,
}, initImageIds)

export default combineReducers({
  selectedIds,
  imageIds,
})
