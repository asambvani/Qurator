import mongoose from 'mongoose'
import _ from 'lodash'

const log = console.log.bind(console)
const error = console.error.bind(console)

const ImageSchema = mongoose.Schema({
  url: String,
  title: String,
  productId: Number,
  description: String,
  artist: String,
  artistBio: String,
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
      error(err)
      throw err
    }
  },

  async filter({ tags = [], query = '' }) {
    try {
      const fieldsToQuery = ['title', 'description', 'artistBio']
      const expr = fieldsToQuery.map(field => (
        { [field]: { $regex: `.*${query}*.` } }
      ))

      let images = []
      if (tags.length && query.length) {
        images = await this.find({ $or: expr, tags: { $all: tags } })
      } else if (tags.length) {
        images = await this.find({ tags: { $all: tags } })
      } else if (query.length) {
        images = await this.find({ $or: expr })
      } else {
        images = await this.find()
      }
      log(expr)
      return images
    } catch (err) {
      error(err)
      throw err
    }
  },
}

export default mongoose.model('Image', ImageSchema)
