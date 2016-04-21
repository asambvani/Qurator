import { createReducer } from 'redux-act'
import { defaults } from 'lodash'
import findIndex from 'lodash/findIndex'
import initialState from '../services/initialState'
import { addToCart, removeFromCart, resetCart } from '../actions/cart'

export default createReducer({
  [addToCart]: (state, item) => {
    const itemWithDefaults = defaults(item, { variant: 0, qty: 1 })
    const index = findIndex(state, { id: item.id })
    if (index > -1) {
      const updatedItem = Object.assign({}, itemWithDefaults, { qty: state[index].qty + 1 })
      // Don't know why [ ...updatedItem ] syntax isn't wokring
      return state.slice(0, index).concat(updatedItem).concat(state.slice(index + 1))
    }
    return [...state, itemWithDefaults]
  },
  [removeFromCart]: (state, item) => {
    const index = findIndex(state, { id: item.id })
    if (index > -1) {
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ]
    }
    return state
  },
  [resetCart]: () => initialState.cart,
}, initialState.cart)

