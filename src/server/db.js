import mongoose from 'mongoose'
import config from 'config'
import './models'

const connect = () => mongoose.connect(config.get('db')).connection

export default connect()
  .on('error', console.error)
  .on('disconnected', connect)
