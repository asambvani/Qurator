import { createAction } from 'redux-act'
import { CALL_API_SYMBOL, Schemas } from 'middleware/api'

export const imagesRequest = createAction('Images request start')
export const imagesSuccess = createAction('Images request success')
export const imagesFailure = createAction('Images request failure')

export function fetchImages(options) {
  return {
    [CALL_API_SYMBOL]: {
      data: options,
      actions: [imagesRequest, imagesSuccess, imagesFailure],
      method: 'POST',
      endpoint: 'images',
      schema: Schemas.IMAGE_ARRAY,
    },
  }
}

export function loadImages(options) {
  return dispatch => dispatch(fetchImages(options))
}
