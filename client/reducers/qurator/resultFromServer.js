import { createReducer } from 'redux-act'
import initialState from '../../services/initialState'
import { types } from 'actions/images'
import { resetPicker } from 'actions/picker'
const init = initialState.qurator.resultFromServer


export default createReducer({
  [types.imageByTags.success]: (state, { result }) => result,
  [resetPicker]: () => [],
}, init)
