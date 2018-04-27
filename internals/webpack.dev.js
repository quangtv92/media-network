const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const rootDir = path.resolve(__dirname, '..')

console.log(rootDir)

module.exports = {
  mode: 'development',
  context: rootDir,
  entry: {
    app: [ path.join(rootDir, 'src/js/index.js') ]
  },
  output: {
    path: path.join(rootDir, 'public/assets'),
    publicPath: '/assets/',
    filename: 'js/[name].[hash:5].js'
  },
  plugins: [
    new CleanWebpackPlugin([
      path.join(rootDir, './public')
    ], {
      verbose: true,
      watch: true,
      allowExternal: true
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(rootDir, 'src/views/index.html'),
      filename: path.join(rootDir, 'public/index.html'),
      chunks: [ 'app' ],
      env: {
        label: 'Hello world'
      }
    })
  ],
  resolve: {
    modules: [ 'src', 'node_modules' ]
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              interpolate: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:5].[ext]',
              publicPath: '/assets/'
            }
          }
        ]
      }
    ]
  }
}
