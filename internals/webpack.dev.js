const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const rootDir = path.resolve(__dirname, '..')

module.exports = {
  mode: 'development',
  entry: {
    app: [ path.join(rootDir, 'src/js/index.js') ]
  },
  output: {
    path: path.join(rootDir, 'public/assets'),
    publicPath: '/assets/',
    filename: 'js/[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(rootDir, 'src/views/index.hbs'),
      filename: path.join(rootDir, 'public/index.html'),
      chunks: [ 'app' ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      }
    ]
  }
}
