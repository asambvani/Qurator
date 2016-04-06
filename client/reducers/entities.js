import merge from 'lodash/merge'
import initialState from 'services/initialState'
import get from 'lodash/get'


export default (state = initialState.entities, action) => {
  const entities = get(action, 'payload.entities')
  if (entities) {
    return merge({}, state, entities)
  }
  return state
}
