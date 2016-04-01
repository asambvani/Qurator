import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import merge from 'lodash/merge'
import picker from './picker'
import currentPicker from './currentPicker'
import cart from './cart'

export function entities(state = { images: {} }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }
  return state
}

const rootReducer = combineReducers({
  entities,
  picker,
  currentPicker,
  cart,
  form,
})

export default rootReducer
