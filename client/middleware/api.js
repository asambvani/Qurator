import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'

export const CALL_API_SYMBOL = Symbol('Call API')

const imageSchema = new Schema('images', { idAttribute: 'id' })
export const Schemas = {
  IMAGE: imageSchema,
  IMAGE_ARRAY: arrayOf(imageSchema),
}

const callAPI = (endpoint, method, data, schema) => { // eslint-disable-line arrow-body-style
  return fetch(`/api/${endpoint}`, {
    method: method || 'GET',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data || {}),
  })
    .then(response =>
      response.json().then(json => ({ json, response }))
    )
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return normalize(camelizeKeys(json), schema)
    })
}

export default store => next => action => { // eslint-disable-line no-unused-vars
  const apiAction = action[CALL_API_SYMBOL]
  if (typeof apiAction === 'undefined') {
    return next(action)
  }

  const { endpoint, schema, actions, method, data } = apiAction
  const { start: requestAction, success: successAction, fail: failureAction } = actions
  next(requestAction())

  return callAPI(endpoint, method, data, schema).then(
    response => next(successAction(response)),
    error => next(failureAction({ error: error.message || 'Oops!' }))
  )
}
