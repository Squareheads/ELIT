const path = require('path')

const commonConfig = {
  node: {
    __dirname: false    
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'standard-loader',
        options: {
          typeCheck: true,
          emitErrors: true
        }
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          typeCheck: true,
          emitErrors: true
        }
      },
      {
        test: /\.tsx?$/,
        loader: ['babel-loader', 'ts-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.json']
  }
}

const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
module.exports = [
  Object.assign(
    {
      target: 'electron-main',
      entry: { main: './src/main.tsx' },
      plugins: [new webpack.ContextReplacementPlugin(/protobufjs/, /^$/)]
    },
    commonConfig),
  Object.assign(
    {
      target: 'electron-renderer',
      entry: { gui: './src/gui.tsx' },
      plugins: [
        new HtmlWebpackPlugin({template: 'template/index.html.template',inject: 'body'}),
        new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop'),
      ]
    },
    commonConfig)
]
