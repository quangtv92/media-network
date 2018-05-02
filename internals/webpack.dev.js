const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const rootDir = path.resolve(__dirname, '..')

const htmlMinifyOptions = {
  collapseWhitespace: true,
  decodeEntities: true,
  removeComments: true,
  removeEmptyAttributes: true,
  sortAttributes: true,
  sortClassName: true
}

module.exports = {
  mode: 'development',
  context: rootDir,
  entry: {
    app: [ path.join(rootDir, 'src/js/app.js') ]
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
      watch: false,
      allowExternal: true
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(rootDir, 'src/views/pages/home'),
      filename: path.join(rootDir, 'public/index.html'),
      chunks: [ 'app' ],
      minify: htmlMinifyOptions
    }),
    new ExtractTextPlugin('css/[name].[hash:5].css')
  ],
  resolve: {
    modules: [ 'src', 'node_modules' ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [ 'env', {
                  target: {
                    browser: [ 'last 2 versions', 'safari >=7' ]
                  }
                } ]
              ],
              plugins: [
                'transform-runtime'
              ]
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 'css-loader', 'stylus-loader' ]
        })
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              interpolate: true,
              attrs: false
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
              publicPath: '/assets/',
              emitFile: true
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash:5].[ext]',
              publicPath: '/assets/'
            }
          }
        ]
      },
      {
        test: /\.hbs$/,
        use: [
          {
            loader: 'handlebars-loader',
            options: {
              rootRelative: path.join(rootDir, 'src/views/') + '/'
            }
          }
        ]
      }
    ]
  }
}
