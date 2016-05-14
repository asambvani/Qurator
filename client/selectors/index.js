import { createSelector } from 'reselect'
import { toArray, uniqBy } from 'lodash'

const imageSelector = state => state.entities.images
const cartSelector = state => state.cart
const pickerSelected = state => state.qurator.picker.selectedIds
const qurateSelected = state => state.qurator.selectedImages

export const allArtists = createSelector(
  imageSelector,
  images => uniqBy(toArray(images).map(image => image.artist), 'id')
)

export const allTags = createSelector(
  imageSelector,
  images => {
    const tags = new Set()
    toArray(images).map(image => image.tags.forEach(tag => tags.add(tag)))
    return [...tags]
  }
)

export const currentTags = createSelector(
  imageSelector,
  pickerSelected,
  qurateSelected,
  (images, pickerSelectedIds, selectedImages) => (
    [...pickerSelectedIds, ...selectedImages]
      .map(id => images[id])
      .reduce((tags, image) => {
        image.tags.forEach(tag => {
          tags[tag] = ++tags[tag] || 1
        })
        return tags
      }, {})
  )
)

export const cartItems = createSelector(
  cartSelector,
  imageSelector,
  (items, images) => (
    items.map(item => {
      item.image = images[item.id]
      return item
    })
  )
)
