import { createSelector } from 'reselect'

state => ({
  // Images to array, should it be an array initially?
  images: Object.keys(state.entities.images).map(k => state.entities.images[k]),
  tags: selectedTags(state),
})

export const showcase = createSelector(
  (state) => state.picker,
  (state) => state.entities.images,
  (ids, images) => (
    images.reduce((tags, image) => {
      image.tags.forEach(tag => tags.add(tag))
      return {images,tags}
    }, new Set())
  )
)
