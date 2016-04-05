import { createSelector } from 'reselect'
import { toArray } from 'lodash'

export const allTags = createSelector(
  (state) => state.entities.images,
  (images) => {
    const tags = new Set()
    toArray(images).map(image => image.tags.forEach(tag => tags.add(tag)))
    return [...tags]
  }
)

export const currentTags = createSelector(
  (state) => state.picker,
  (state) => state.entities.images,
  (ids, images) => (
    ids.map(id => images[id]).reduce((tags, image) => {
      image.tags.forEach(tag => {
        tags[tag] = ++tags[tag] || 1
      })
      return tags
    }, {})
  )
)

export const cartItems = createSelector(
  (state) => state.cart,
  (state) => state.entities.images,
  (items, images) => (
    items.map(item => {
      item.image = images[item.id]
      return item
    })
  )
)
