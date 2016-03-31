import path from 'path'
import webpack from 'webpack'
import postcssNext from 'postcss-cssnext'
import postcssImport from 'postcss-import'
import postcssNested from 'postcss-nested'
import HtmlPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const dev = process.env.NODE_ENV !== 'production'
const cssModuleName = dev ? '&localIdentName=[name]__[local]--[hash:base64:5]' : ''

const productionPlugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('production') },
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false,
    },
  }),
]

let plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({ __DEBUG__: dev }),
  new HtmlPlugin({ inject: true, template: './client/index.html' }),
  new ExtractTextPlugin('style.[chunkhash].css', {
    disable: dev,
    allChunks: true,
  }),
]

if (!dev) plugins = plugins.concat(productionPlugins)

module.exports = {
  devtool: dev ? 'eval' : 'source-map',

  entry: dev ? {
    app: [
      './client/styles/bootstrap.min.css',
      'eventsource-polyfill',
      'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
      './client/index',
    ],
  } : {
    app: './client/index.js',
  },

  output: {
    publicPath: '/',
    path: path.join(__dirname, 'public'),
    filename: 'js/[name].[hash].js',
  },

  postcss: [
    postcssImport({
      addDependencyTo: webpack,
      path: [
        path.resolve(__dirname, 'client'),
        path.resolve(__dirname, 'client/styles'),
      ],
    }),
    postcssNested(),
    postcssNext(),
  ],

  module: {
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /(node_modules|static|styles)/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        exclude: /client\/styles/,
        loader: ExtractTextPlugin.extract(
          'style',
          `css?modules&importLoaders=1${cssModuleName}!postcss`
        ),
      },
      {
        test: /\.css$/,
        include: /client\/styles/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css!postcss'
        ),
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader?name=../img/[name].[ext]',
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=../fonts/[name].[ext]',
      },
    ],
  },

  resolve: {
    extensions: ['', '.js', '.html', '.css'],
    root: path.join(__dirname, 'client'),
    alias: {
      _shared: path.join(__dirname, 'client/components/shared'),
    },
    modulesDirectories: [
      'client',
      'node_modules',
    ],
  },

  plugins,

}
