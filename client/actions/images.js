import { createAction } from 'redux-act'
import { CALL_API_SYMBOL, Schemas } from 'middleware/api'

const START = 'start'
const SUCCESS = 'success'
const FAILURE = 'fail'

const createRequestActions = (base) => (
  [START, SUCCESS, FAILURE].reduce((res, key) => {
    res[key] = createAction(`${base}.${key}`)
    return res
  }, {})
)

const factory = (endpoint, actions) => (data) => ({
  [CALL_API_SYMBOL]: {
    data,
    actions,
    endpoint,
    method: 'POST',
    schema: Schemas.IMAGE_ARRAY,
  },
})

const imagesTagsActions = createRequestActions('imagesByTags')
const imagesFilterActions = createRequestActions('imagesByFilter')
const imagesPickerActions = createRequestActions('imagesForPicker')

const filterImagesByForm = factory('images/filter', imagesFilterActions)
const filterImagesByTags = factory('images/tags', imagesTagsActions)
const imagesForPicker = factory('images/picker', imagesPickerActions)

export {
  filterImagesByForm,
  filterImagesByTags,
  imagesForPicker,
  imagesFilterActions,
  imagesTagsActions,
  imagesPickerActions,
}
