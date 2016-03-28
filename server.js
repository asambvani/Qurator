import path from 'path'
import express from 'express'
import config from 'config'
import logger from 'morgan'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import history from 'connect-history-api-fallback'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './webpack.config.babel'
import db from './server/db'
import router from './server/api'

const app = express()
const compiler = webpack(webpackConfig)
const port = config.get('port')

app.use(logger('dev'))
app.use(express.static(path.join(__dirname, '/static')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', router)
app.use(history())

// if (prod) { }

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

const listen = () => {
  app.listen(port)
  console.log(`🔥 Listening at http://localhost:${port}`)
}

db.once('open', listen)
