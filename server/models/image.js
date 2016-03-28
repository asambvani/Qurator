import mongoose from 'mongoose'

const ImageSchema = mongoose.Schema({
  url: String,
  tags: Array,
  order: Number,
})

ImageSchema.statics = {
  list: async function({ tags = [], resolution, name }) {
    try {
      if (!tags.length) {
        const res = await this.find()
        return res
      }
      return await this.find({ tags: { $all: tags } })
    } catch(err) {
      console.error(err)
    }
  }
}

export default mongoose.model('Image', ImageSchema)
