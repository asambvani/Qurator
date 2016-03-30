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
    body: data || {},
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

  const { endpoint, schema, types, method, data } = apiAction
  const [requestType, successType, failureType] = types

  const actionWith = (payload) => {
    const finalAction = Object.assign({}, action, payload)
    delete finalAction[CALL_API_SYMBOL]
    return finalAction
  }

  next(actionWith({ type: requestType }))

  return callAPI(endpoint, method, data, schema).then(
    response => next(actionWith({
      type: successType,
      response,
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Oops!',
    }))
  )
}
