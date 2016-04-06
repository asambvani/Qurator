import { createReducer } from 'redux-act'
import initialState from '../../services/initialState'
import { imagesTagsActions } from 'actions/images'
import { resetPicker } from 'actions/picker'

const init = initialState.qurator.resultFromServer

export default createReducer({
  [imagesTagsActions.success]: (state, { result }) => result,
  [resetPicker]: () => [],
}, init)
