import { ADD_TO_LIST, REMOVE_FROM_LIST } from '../actions/list'

const list = (reducer) => {
  return (state = [], action) => {
    const { index } = action

    switch (action.type) {
      case ADD_TO_LIST:
        return [
          ...state,
          reducer(undefined, action),
        ]
      case REMOVE_FROM_LIST:
        if (typeof index === 'number') {
          return [
            ...state.slice(0, index),
            ...state.slice(index + 1),
          ]
        }
        return state.slice(0, state.length - 1)
      default:
        if (typeof index === 'number') {
          return [
            ...state.slice(0, index),
            reducer(state[index], action),
            ...state.slice(index + 1),
          ]
        }
        return state
    }
  }
}

export default list
