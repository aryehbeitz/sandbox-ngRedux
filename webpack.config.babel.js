import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
export default {
  context: __dirname + '/src',
  entry: './main.js',
  output: {
    path: __dirname + '/src',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
    exclude: /node_modules/,
    loader: 'awesome-typescript-loader'
      },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.html$/,
        loaders: ['html']
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.(ttf|otf|eot|svg|woff(2)?)$/, loader: 'url' }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};