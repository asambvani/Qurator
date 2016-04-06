import { createReducer } from 'redux-act'
import { imagesPickerActions } from '../../actions/images'
import { resetPicker } from '../../actions/picker'
import initialState from '../../services/initialState'

const init = initialState.qurator.step

export default createReducer({
  [imagesPickerActions.success]: (state) => state + 1,
  [resetPicker]: () => init,
}, init)
