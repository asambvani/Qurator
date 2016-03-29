import { createSelector } from 'reselect'

export const currentImages = createSelector(
  state => state.entities.images,
  images => Object.keys(images).map(k => images[k])
)

export const currentTags = createSelector(
  (state) => state.picker,
  (state) => state.entities.images,
  (ids, images) => (
    ids.map(id => images[id]).reduce((tags, image) => {
      image.tags.forEach(tag => tags.add(tag))
      return tags
    }, new Set())
  )
)
