import { createReducer } from 'redux-act'
import initialState from '../../services/initialState'
import { resetPicker, pickImage, unpickImage } from '../../actions/picker'
import without from 'lodash/without'


const init = initialState.qurator.selectedImages

export default createReducer({
  [pickImage]: (state, id) => [...state, id],
  [unpickImage]: (state, id) => without(state, id),
  [resetPicker]: () => init,
}, init)
