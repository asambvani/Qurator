import { createReducer } from 'redux-act'
import initialState from '../services/initialState'
import { IMAGES_SUCCESS } from '../actions/images'

export default createReducer({
  [IMAGES_SUCCESS]: (state, payload) => {
    console.log(payload)
    return state
  },
}, initialState.imagesFilter)

