import { createAction } from 'redux-act'

export const addToCart = createAction('Add to cart')
export const removeFromCart = createAction('Remove from cart')
export const resetCart = createAction('Reset cart')
