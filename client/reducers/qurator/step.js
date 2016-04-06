import { createReducer } from 'redux-act'
import { types } from '../../actions/images'
import initialState from '../../services/initialState'
import { resetPicker } from '../../actions/picker'
const init = initialState.qurator.step

export default createReducer({
  [types.imagesForPicker.success]: (state) => state + 1,
  [resetPicker]: () => init,
}, init)
