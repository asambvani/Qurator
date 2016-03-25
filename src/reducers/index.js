import { combineReducers } from 'redux'
import counter from './counter'
import list from './list'
import { entities, pagination } from './github'

const rootReducer = combineReducers({
  counterList: list(counter),
  pagination,
  entities,
})

export default rootReducer
