export const ADD_TO_LIST = 'ADD_TO_LIST'
export const REMOVE_FROM_LIST = 'REMOVE_FROM_LIST'

export const addToList = () => ({
  type: ADD_TO_LIST
})

export const removeFromList = (index) => ({
  type: REMOVE_FROM_LIST,
  index
})
