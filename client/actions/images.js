import { Schemas } from 'middleware/api'
import { createRequestActions, factory } from './api'

const imagesTagsActions = createRequestActions('imagesByTags')
const imagesFilterActions = createRequestActions('imagesByFilter')
const imagesPickerActions = createRequestActions('imagesForPicker')

const { IMAGE_ARRAY } = Schemas

const filterImagesByForm = factory('images/filter', imagesFilterActions, IMAGE_ARRAY)
const filterImagesByTags = factory('images/tags', imagesTagsActions, IMAGE_ARRAY)
const imagesForPicker = factory('images/picker', imagesPickerActions, IMAGE_ARRAY)

export {
  filterImagesByForm,
  filterImagesByTags,
  imagesForPicker,
  imagesFilterActions,
  imagesTagsActions,
  imagesPickerActions,
}
