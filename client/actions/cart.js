import { createAction } from 'redux-act'
import { createRequestActions, factory } from './api'

const addToCart = createAction('Add to cart')
const removeFromCart = createAction('Remove from cart')
const resetCart = createAction('Reset cart')

const syncCartActions = createRequestActions('Sync cart')
const syncCart = factory('cart', syncCartActions)

export {
  addToCart,
  removeFromCart,
  resetCart,
  syncCart,
}
