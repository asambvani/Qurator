import path from 'path'
import express from 'express'
import config from 'config'
import logger from 'morgan'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import history from 'connect-history-api-fallback'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'
import db from './db'
import router from './api'

const app = express()
const compiler = webpack(webpackConfig)
const port = config.get('port')

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
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

const listen = () => {
  app.listen(port)
  console.log(`🔥 Listening at http://localhost:${port}`)
}

db.once('open', listen)
