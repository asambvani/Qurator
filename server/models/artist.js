import mongoose from 'mongoose'

const log = console.log.bind(console)
const error = console.error.bind(console)

const ArtistSchema = mongoose.Schema({
  _id: Number,
  bio: String,
  name: String,
  image: String,
  instagram: String,
})

ArtistSchema.statics = {
  async list() {
    try {
      const artists = await this.find()
      log(artists)
      return artists
    } catch (err) {
      error(err)
      throw err
    }
  },
}

export default mongoose.model('Artist', ArtistSchema)
