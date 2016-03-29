import { createReducer } from 'redux-act'
import { pickImage, unpickImage, resetPicker } from '../actions/picker'

export default createReducer({
  [pickImage]: (state, id) => [...state, id],
  [unpickImage]: (state, id) => {
    const index = state.indexOf(id)
    if (index > -1) {
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ]
    }
    return state
  },
  [resetPicker]: () => [],
}, [])

// const tagsReducer = createReducer({
//   [pickImage]: (state, id) => [...state, id],
//   [unpickImage]: (state, id) => {
//     const index = state.indexOf(id)
//     if (index > -1) {
//       return [
//         ...state.slice(0, index),
//         ...state.slice(index + 1),
//       ]
//     }
//     return state
//   },
//   [resetPicker]: () => [],
// })
//
// export default combineReducers({
//
// })

// tags = { car: 2, woman: 1 }
// const tags = (state = {}, { type, image }) => {
//   const index = state.indexOf(image)
//
//   switch (type) {
//     case PICK_IMAGE:
//       return [
//         ...state,
//         image,
//       ]
//     case UNPICK_IMAGE:
//       if (index > -1) {
//         return [
//           ...state.slice(0, index),
//           ...state.slice(index + 1),
//         ]
//       }
//       return state
//     case RESET_PICKER:
//       return []
//     default:
//       return state
//   }
// }
//
//
// export default picker
