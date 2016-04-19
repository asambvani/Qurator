import { createReducer } from 'redux-act'
import { stepForward } from 'actions/qurate'
import { resetPicker } from 'actions/picker'
import initialState from 'services/initialState'

const init = initialState.qurator.step

export default createReducer({
  [stepForward]: (state) => (state % 4) + 1,
  [resetPicker]: () => init,
}, init)
