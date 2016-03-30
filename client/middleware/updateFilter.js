import { fetchImages } from '../actions/images'
import { pickImage } from '../actions/picker'
import { currentTags } from '../selectors'

export default store => next => action => {
  const result = next(action)
  if (action.type === pickImage.getType()) {
    const tags = currentTags(store.getState())
    next(fetchImages(tags))
  }
  return result
}
