import { createReducer } from 'redux-act'
import merge from 'lodash/merge'
import initialState from 'services/initialState'
import { imagesSuccess } from 'actions/images'

export default createReducer({
  [imagesSuccess]: (state, response) => merge({}, state, response.entities),
}, initialState.entities)
