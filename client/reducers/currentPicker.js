import { createReducer } from 'redux-act'
import initialState from '../services/initialState'
import { showNextPicker, resetPicker } from '../actions/picker'

export default createReducer({
  [showNextPicker]: (state, nextState) => nextState,
  [resetPicker]: () => initialState.currentPicker,
}, initialState.currentPicker)
