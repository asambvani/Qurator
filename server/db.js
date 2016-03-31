import mongoose from 'mongoose'
import config from 'config'
import './models'

console.log(`Connecting to ${config.get('db')}`)
const connect = () => mongoose.connect(config.get('db')).connection

export default connect()
  .on('error', console.error)
  .on('disconnected', connect)
