import path from 'path'
import express from 'express'
import http from 'http'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import history from 'connect-history-api-fallback'
import config from './webpack.config.babel'

const app = express()
const compiler = webpack(config)
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '/static')))
app.use(history())

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  noInfo: true,
  publicPath: config.output.publicPath,
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

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(`🔥 Listening at http://localhost:${port}`)
})
