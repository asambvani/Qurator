import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import entities from './entities'
import picker from './picker'
import currentPicker from './currentPicker'
import cart from './cart'
import imagesFilter from './imagesFilter'

const rootReducer = combineReducers({
  entities,
  picker,
  currentPicker,
  cart,
  form,
  imagesFilter,
})

export default rootReducer
