import { createReducer } from 'redux-act'
import initialState from '../services/initialState'
import { showNextPicker } from '../actions/picker'

export default createReducer({
  [showNextPicker]: (state, nextState) => nextState,
}, initialState.currentPicker)
