import { combineReducers } from 'redux'
import step from './step'
import picker from './picker'
import selectedImages from './selectedImages'
import resultFromServer from './resultFromServer'

export default combineReducers({
  step,
  picker,
  selectedImages,
  resultFromServer,
})
