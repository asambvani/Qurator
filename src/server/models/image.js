import mongoose from 'mongoose'

const imageSchema = mongoose.Schema({
  url: String,
  tags: Array,
  order: Number,
})

export default mongoose.model('Image', imageSchema)
