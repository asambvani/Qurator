import path from 'path'
import express from 'express'
import config from 'config'
import logger from 'morgan'
import webpack from 'webpack'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import connectMongo from 'connect-mongo'
import history from 'connect-history-api-fallback'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'
import db from './db'
import log from './log'
import router from './api'

const app = express()
const compiler = webpack(webpackConfig)
const port = config.get('port')
const mongoStore = connectMongo(session)

db(config.get('db'), log).then(({ connection }) => {
  app.use(logger('dev'))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cookieParser())
  app.use(session({
    secret: 'qurator',
    store: new mongoStore({ mongooseConnection: connection }),
    resave: false,
    saveUninitialized: false,
  }))
  app.use('/api', router)
  app.use(history())

  if (process.env.NODE_ENV !== 'production') {
    app.use(webpackDevMiddleware(compiler, {
      hot: true,
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
      historyApiFallback: true,
      stats: {
        hash: false,
        colors: true,
        timings: true,
        chunks: true,
        assets: false,
        version: false,
        children: false,
        chunkModules: false,
      },
    }))

    app.use(webpackHotMiddleware(compiler))
  }

  app.use('/img', express.static(path.join(__dirname, '../img')))
  app.use(express.static(path.join(__dirname, '../public')))
  app.listen(port)
  log(`Listening at http://localhost:${port}`)
}).catch(e => console.log(e))
