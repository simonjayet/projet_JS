const path = require('path')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin')

const env = process.env.NODE_ENV

let config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    scripts: './index.js',
    styles: './stylesheets/styles.scss'
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'assets/js/[name].js',
    library: 'myApp',
    libraryTarget: 'umd',
    publicPath: 'http://localhost:8080/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.scss$/,
      use: env === 'production' ? ExtractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: [ 'css-loader', 'sass-loader', 'postcss-loader' ]
      }) : ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: [{loader: 'css-loader'}, {loader: 'sass-loader'}, {loader: 'postcss-loader'}]
      }))
    },
    {
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[sha512:hash:base64:7].[ext]',
          outputPath: 'assets/images/'
        }
      }]
    }]
  },
  plugins: env === 'production' ? [
    new ExtractTextWebpackPlugin('assets/stylesheets/[name].css'),
    new UglifyJSPlugin(),
    new OptimizeCSSAssets()
  ] : [
    new ExtractTextWebpackPlugin('assets/stylesheets/[name].css')
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    historyApiFallback: true,
    inline: true,
    open: true,
    hot: true,
    overlay: true
  },
  devtool: 'eval'
}

module.exports = config