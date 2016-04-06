import { createReducer } from 'redux-act'
import initialState from 'services/initialState'
// import { imagesRequest, imagesSuccess, imagesFailure } from 'actions/images'

export default createReducer({
  // [imagesRequest]: (state) => Object.assign({}, state, { isFetching: true }),
  // [imagesSuccess]: (state, response) => (
  //   Object.assign({}, state, {
  //     isFetching: false,
  //     ids: response.result,
  //   })
  // ),
  // [imagesFailure]: (state) => Object.assign({}, state, { isFetching: false }),
}, initialState.imagesFilter)
