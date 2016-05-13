import { createAction } from 'redux-act'
import { CALL_API_SYMBOL } from 'middleware/api'

const START = 'start'
const SUCCESS = 'success'
const FAILURE = 'fail'

export const createRequestActions = (base) => (
  [START, SUCCESS, FAILURE].reduce((res, key) => {
    res[key] = createAction(`${base}.${key}`)
    return res
  }, {})
)

export const factory = (endpoint, actions, schema) => (data) => ({
  [CALL_API_SYMBOL]: {
    data,
    schema,
    actions,
    endpoint,
    method: 'POST',
  },
})
