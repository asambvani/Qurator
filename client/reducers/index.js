import { combineReducers } from 'redux'
import merge from 'lodash/merge'
import picker from './picker'
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
  cart,
})

export default rootReducer
