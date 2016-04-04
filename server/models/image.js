import mongoose from 'mongoose'
import _ from 'lodash'

const ImageSchema = mongoose.Schema({
  url: String,
  title: String,
  productId: String,
  description: String,
  artist: String,
  artistBio: String,
  scene: String,
  color: String,
  mood: String,
  complexity: String,
  tags: Array,
  order: Number,
})

ImageSchema.statics = {
  async list({ tags = {} }) {
    try {
      const images = await this.find()

      const imagesOrdered = _.orderBy(
        images
          .map(image => image.toObject())
          .map(image => {
            const matchingTags = _.intersection(image.tags, Object.keys(tags))
            const weight = matchingTags.reduce((sum, tag) => sum + tags[tag], 0)
            return { ...image, weight }
          }), 'weight', 'desc')
      return imagesOrdered.slice(0, 100)
    } catch (err) {
      console.error(err)
      return err
    }
  },
}

export default mongoose.model('Image', ImageSchema)
