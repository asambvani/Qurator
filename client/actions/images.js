import { CALL_API_SYMBOL, Schemas } from 'middleware/api'

export const IMAGES_REQUEST = 'IMAGES_REQUEST'
export const IMAGES_SUCCESS = 'IMAGES_SUCCESS'
export const IMAGES_FAILURE = 'IMAGES_FAILURE'

export function fetchImages(tags = []) {
  return {
    [CALL_API_SYMBOL]: {
      data: {tags},
      types: [IMAGES_REQUEST, IMAGES_SUCCESS, IMAGES_FAILURE],
      method: 'POST',
      endpoint: 'images',
      schema: Schemas.IMAGE_ARRAY,
    },
  }
}

export function loadImages(tags) {
  return (dispatch, getState) => {
    return dispatch(fetchImages(tags))
  }
}
