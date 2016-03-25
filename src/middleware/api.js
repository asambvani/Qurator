import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'

export const CALL_API_SYMBOL = Symbol('Call API')

const userSchema = new Schema('users', { idAttribute: (entity) => entity.login.toLowerCase() })
const repoSchema = new Schema('repos', { idAttribute: (entity) => entity.fullName.toLowerCase() })
repoSchema.define({ owner: userSchema })

export const Schemas = {
  USER: userSchema,
  USER_ARRAY: arrayOf(userSchema),
  REPO: repoSchema,
  REPO_ARRAY: arrayOf(repoSchema),
}

const getNextPageUrl = (response) => {
  const link = response.headers.get('link')
  if (!link) {
    return null
  }

  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
  if (!nextLink) {
    return null
  }

  return nextLink.split(';')[0].slice(1, -1)
}

const callAPI = (endpoint, schema) => {
  const API_ROOT = 'https://api.github.com/'
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    )
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      const nextPageUrl = getNextPageUrl(response)

      return Object.assign({},
        normalize(camelizeKeys(json), schema),
        { nextPageUrl }
      )
    })
}

export default store => next => action => { // eslint-disable-line no-unused-vars
  const apiAction = action[CALL_API_SYMBOL]
  if (typeof apiAction === 'undefined') {
    return next(action)
  }

  const { endpoint, schema, types } = apiAction
  const [requestType, successType, failureType] = types

  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API_SYMBOL]
    return finalAction
  }

  next(actionWith({ type: requestType }))

  return callAPI(endpoint, schema).then(
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
