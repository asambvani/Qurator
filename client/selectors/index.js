import { createSelector } from 'reselect'

export const selectedTags = createSelector(
  (state) => state.picker,
  (images) => (
    images.reduce((tags, image) => {
      image.tags.forEach(tag => tags.add(tag))
      return tags
    }, new Set())
  )
)
