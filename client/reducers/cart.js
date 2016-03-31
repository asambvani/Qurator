import { createReducer } from 'redux-act'
import _ from 'lodash'
import { addToCart, removeFromCart, resetCart } from '../actions/cart'

export default createReducer({
  [addToCart]: (state, item) => {
    const index = _.findIndex(state, { id: item.id })
    if (index > -1) {
      return [
        ...state.slice(0, index),
        ...item,
        ...state.slice(index + 1),
      ]
    }
    return [...state, item]
  },
  [removeFromCart]: (state, item) => {
    const index = _.findIndex(state, { id: item.id })
    if (index > -1) {
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ]
    }
    return state
  },
  [resetCart]: () => [],
}, [])

