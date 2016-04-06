import { createAction } from 'redux-act'
import { CALL_API_SYMBOL, Schemas } from 'middleware/api'

const actionsFactory = (actionHash) => actionHash
const types = actionsFactory(
  {
    imageByFiler: {
      start: createAction('imageByFiler.start'),
      success: createAction('imageByFiler.success'),
      fail: createAction('imageByFiler.fail'),
    },
    imageByTags: {
      start: createAction('imageByTags.start'),
      success: createAction('imageByTags.success'),
      fail: createAction('imageByTags.fail'),
    },
    imagesForPicker: {
      start: createAction('imagesForPicker.start'),
      success: createAction('imagesForPicker.success'),
      fail: createAction('imagesForPicker.fail'),
    },
  }
)

const factory = (endpoint, actions) => (data) => ({
  [CALL_API_SYMBOL]: {
    data,
    actions,
    method: 'POST',
    endpoint,
    schema: Schemas.IMAGE_ARRAY,
  },
})

const filterImagesByForm = factory('images/filter', types.imageByFiler)
const filterImagesByTags = factory('images/tags', types.imageByTags)
const imagesForPicker = factory('images/picker', types.imagesForPicker)


export { filterImagesByForm, filterImagesByTags, imagesForPicker, types }
