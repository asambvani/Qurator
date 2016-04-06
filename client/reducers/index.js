import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import entities from './entities'
import qurator from './qurator'
import cart from './cart'
import imagesFilter from './imagesFilter'

const rootReducer = combineReducers({
  entities,
  qurator,
  cart,
  form,
  imagesFilter,
})

export default rootReducer
