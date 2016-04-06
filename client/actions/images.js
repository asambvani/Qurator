import { createAction } from 'redux-act'
import { CALL_API_SYMBOL, Schemas } from 'middleware/api'

const imagesFilterActions = {
  start: createAction('imageByFiler.start'),
  success: createAction('imageByFiler.success'),
  fail: createAction('imageByFiler.fail'),
}

const imagesTagsActions = {
  start: createAction('imageByTags.start'),
  success: createAction('imageByTags.success'),
  fail: createAction('imageByTags.fail'),
}

const imagesPickerActions = {
  start: createAction('imagesForPicker.start'),
  success: createAction('imagesForPicker.success'),
  fail: createAction('imagesForPicker.fail'),
}

const factory = (endpoint, actions) => (data) => ({
  [CALL_API_SYMBOL]: {
    data,
    actions,
    endpoint,
    method: 'POST',
    schema: Schemas.IMAGE_ARRAY,
  },
})

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
