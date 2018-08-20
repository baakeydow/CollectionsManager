const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    // serve up any static files from public/
    contentBase: path.join(__dirname, 'Public'),
    // enable gzip compression:
    compress: true,
    // enable pushState() routing, as used by preact-router et al:
    historyApiFallback: true,
    // reload browser
    hot: true,
    inline: true,
    open: false,
    port: 8080
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('dev')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
});
