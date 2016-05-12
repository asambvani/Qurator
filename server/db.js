import mongoose from 'mongoose'
import config from 'config'
import './models'

console.log(`Connecting to ${config.get('db')}`)

export default (mongoUrl, fatalLog) => {
  mongoose.connect(mongoUrl, {
    server: {
      socketOptions: { keepAlive: 10000, connectTimeoutMS: 10000 },
      reconnectTries: 60 * 60 * 24 * 30,
      reconnectInterval: 1000,
    },
  })

  const db = mongoose.connection
  const eventTypes = [
    'error',
    'reconnected',
    'connected',
    'disconnected',
    'close',
  ]

  eventTypes.forEach(event => {
    db.on(event, msg => {
      if (msg) {
        fatalLog('Mongoose:', event, msg)
      } else {
        fatalLog('Mongoose:', event)
      }
    })
  })

  return new Promise((resolve, reject) => {
    db.once('open', () => {
      resolve(mongoose)
    })
    db.once('error', reject)
  })
}
