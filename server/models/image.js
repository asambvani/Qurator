import mongoose from 'mongoose'
import _ from 'lodash'

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

      return await this.aggregate()
        .match(query)
        .limit(100)
        .lookup({
          from: 'artists',
          localField: 'artist_id',
          foreignField: '_id',
          as: 'artist',
        })
        .unwind('$artist')
        .exec()
    } catch (err) {
      error(err)
      throw err
    }
  },
}

export default mongoose.model('Image', ImageSchema)
