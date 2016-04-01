import { createReducer } from 'redux-act'
import initialState from '../services/initialState'
import { pickImage, unpickImage, resetPicker } from '../actions/picker'
import without from 'lodash/without'

export default createReducer({
  [pickImage]: (state, id) => [...state, id],
  [unpickImage]: (state, id) => without(state, id),
  [resetPicker]: () => initialState.picker,
}, initialState.picker)
