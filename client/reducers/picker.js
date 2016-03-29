import { PICK_IMAGE, UNPICK_IMAGE, RESET_PICKER } from '../actions/picker'


const picker = (state = [], { type, image }) => {
  const index = state.indexOf(image)

  switch (type) {
    case PICK_IMAGE:
      return [
        ...state,
        image,
      ]
    case UNPICK_IMAGE:
      if (index > -1) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1),
        ]
      }
      return state
    case RESET_PICKER:
      return []
    default:
      return state
  }
}


//tags = {car:2,woman:1}
const tags = (state = {}, { type, image }) => {
  const index = state.indexOf(image)

  switch (type) {
    case PICK_IMAGE:
      return [
        ...state,
        image,
      ]
    case UNPICK_IMAGE:
      if (index > -1) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1),
        ]
      }
      return state
    case RESET_PICKER:
      return []
    default:
      return state
  }
}


export default picker
