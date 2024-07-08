const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CnameWebpackPlugin = require('cname-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default
const ImageminWebpWebpackPlugin= require('imagemin-webp-webpack-plugin');

const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev'

const dirApp = path.join(__dirname, 'app')
const dirAssets = path.join(__dirname, 'assets')
const dirStyles = path.join(__dirname, 'styles')
const dirNode = 'node_modules'

const folders = [
  'index.html',
  'about/index.html',
  'case/caasocio/index.html',
  'case/diners-club/index.html',
  'case/micheal-moon/index.html',
  'case/vanitee/index.html',
  'case/angely-dub/index.html',
  'case/access-travel/index.html',
  'case/explora-ahora/index.html',
  'case/collabfive/index.html',
  'case/retrato/index.html',
  'case/venatus/index.html',
  'case/adinplay/index.html',
  // 'case/erika-moreira/index.html',
  // 'case/bruno-arizio/index.html',
  // 'case/dominic-berzins/index.html',
  // 'case/pagethink/index.html',
  // 'case/neoway/index.html',
  // 'case/cult/index.html',
  // 'case/movida/index.html',
  // 'case/lufthansa-2/index.html',
  // 'case/tiaa/index.html',
  // 'case/lufthansa-1/index.html',
  // 'case/corvette/index.html',
  // 'case/nike/index.html',
  // 'case/airbnb/index.html',
  // 'case/discovery-kids/index.html',
  // 'case/rock-in-rio/index.html'
];

const mapFolders = folders.map(filename => {
  return new HtmlWebpackPlugin({
    filename,
    template: path.join(__dirname, 'index.pug')
  })
})

module.exports = {
  entry: [
    path.join(dirApp, 'index.js'),
    path.join(dirStyles, 'index.scss')
  ],

  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },

  resolve: {
    modules: [
      dirApp,
      dirAssets,
      dirNode
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
  },

  plugins: [
    new webpack.DefinePlugin({
      IS_DEVELOPMENT
    }),

    new webpack.ProvidePlugin({

    }),

    ...mapFolders,

    new CnameWebpackPlugin({
      domain: 'espi.design'
    }),

    new CopyWebpackPlugin([
      {
        from: './app/service-worker.js',
        to: ''
      }
    ]),

    new CopyWebpackPlugin([
      {
        from: './offline',
        to: 'offline'
      }
    ]),

    new CopyWebpackPlugin([
      {
        from: './shared',
        to: ''
      }
    ]),

    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css',
    }),

    new HTMLInlineCSSWebpackPlugin(),

    new ImageminWebpWebpackPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader']
      },

      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: IS_DEVELOPMENT
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: IS_DEVELOPMENT
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: IS_DEVELOPMENT
            }
          }
        ]
      },

      {
        test: /\.(jpe?g|png|gif|svg|fnt|webp)$/,
        loader: 'file-loader',
        options: {
          name (file) {
            return '[hash].[ext]'
          }
        }
      },

      {
        test: /\.(woff2?)$/,
        loader: 'file-loader',
        options: {
          name (file) {
            return '[name].[ext]'
          }
        }
      },

      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'raw-loader',
        exclude: /node_modules/
      },

      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'glslify-loader',
        exclude: /node_modules/
      }
    ]
  }
}
