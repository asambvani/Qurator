export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER'

export const onIncrement = (index) => ({
  type: INCREMENT_COUNTER,
  index,
})

export const onDecrement = (index) => ({
  type: DECREMENT_COUNTER,
  index,
})
