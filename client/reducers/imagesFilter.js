import { createReducer } from 'redux-act'
import { imagesFilterActions } from 'actions/images'
import initialState from 'services/initialState'

const { start, success, fail } = imagesFilterActions

export default createReducer({
  [start]: (state) => Object.assign({}, state, { isFetching: true }),
  [success]: (state, response) => (
    Object.assign({}, state, {
      isFetching: false,
      ids: response.result,
    })
  ),
  [fail]: (state) => Object.assign({}, state, { isFetching: false }),
}, initialState.imagesFilter)
