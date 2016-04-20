import mongoose from 'mongoose'
import _ from 'lodash'

const log = console.log.bind(console) // eslint-disable-line
const error = console.error.bind(console)

const ImageSchema = mongoose.Schema({
  url: String,
  title: String,
  productId: Number,
  description: String,
  artist: String,
  artistBio: String,
  featured: Boolean,
  tags: Array,
  order: Number,
})

ImageSchema.statics = {
  async list(tags = {}) {
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
      return imagesOrdered.slice(0, 15)
    } catch (err) {
      error(err)
      throw err
    }
  },

  async filter({ tags = [], artist = '', stringQuery = '' }) {
    try {
      const query = {}
      if (stringQuery.length) {
        const fieldsToQuery = ['title', 'description', 'artistBio']
        query.$or = fieldsToQuery.map(field => (
          { [field]: { $regex: `.*${stringQuery}*.`, $options: 'i' } }
        ))
      }

      if (tags.length) {
        query.tags = { $all: tags }
      }

      if (artist && artist.length) {
        query.artist = { $regex: `.*${artist}*.`, $options: 'i' }
      }

      log(JSON.stringify(query))
      return await this.find(query).limit(100)
    } catch (err) {
      error(err)
      throw err
    }
  },
}

export default mongoose.model('Image', ImageSchema)
