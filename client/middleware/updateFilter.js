import { fetchImages } from '../actions/images'
import { showNextPicker, resetPicker } from '../actions/picker'
import { currentTags } from '../selectors'

export default store => next => action => {
  const result = next(action)
  if (action.type === showNextPicker.getType()) {
    const tags = currentTags(store.getState())
    next(fetchImages(tags))
  }

  if (action.type === resetPicker.getType()) {
    next(fetchImages([]))
  }
  return result
}
