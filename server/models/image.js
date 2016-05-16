import mongoose from 'mongoose'
import _ from 'lodash'
import Artist from './artist'

const log = console.log.bind(console) // eslint-disable-line no-unused-vars
const error = console.error.bind(console)

const ImageSchema = mongoose.Schema({
  _id: Number,
  url: String,
  title: String,
  artist_id: Number,
  productId: Number,
  featured: Boolean,
  tags: Array,
})

ImageSchema.statics = {
  async list(tags = {}) {
    try {
      const images = await this.find()
      const artists = await Artist.find()

      const imagesOrdered = _.orderBy(
        images.map(imageDoc => {
          const image = imageDoc.toObject()
          image.artist = _.find(artists, { _id: image.artist_id })
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

  async filter({ tags = [], artist, stringQuery = '' }) {
    try {
      const query = {}
      if (stringQuery.length) {
        const fieldsToQuery = ['title']
        query.$or = fieldsToQuery.map(field => (
          { [field]: { $regex: `.*${stringQuery}*.`, $options: 'i' } }
        ))
      }

      if (tags.length) { query.tags = { $all: tags } }
      if (artist) { query.artist_id = artist }

      const images = await this.find().limit(100)
      const artists = await Artist.find()

      return images.map(imageDoc => {
        const image = imageDoc.toObject()
        image.artist = _.find(artists, { _id: image.artist_id })
        return image
      })
    } catch (err) {
      error(err)
      throw err
    }
  },
}

export default mongoose.model('Image', ImageSchema)
