const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const debug = process.env.NODE_ENV !== "production";

console.log(process.env.NODE_ENV);

const appEntry = debug ? [
  'babel-polyfill',
  path.join(__dirname, 'Src/index.js'),
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server'
] : ['babel-polyfill', path.join(__dirname, 'Src/index.js')];

console.log(appEntry);

module.exports = {
  entry: appEntry,
  output: {
    filename: '[name].min.js',
    publicPath: '/',
    path: debug ? path.resolve(__dirname, 'Public') : path.resolve(__dirname, 'Public/dist')
  },
  target: 'web',
  resolve: {
    extensions: ['.css', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          compact: false,
          presets: ['react', 'env', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader", exclude: '/node_modules/' },
      { test: /\.png$/, loader: "url-loader", exclude: '/node_modules/', query: { mimetype: "image/png" } },
      { test: /\.jpg$/, loader: "url-loader", exclude: '/node_modules/', query: { mimetype: "image/jpg" } },
      { test: /\.svg$/, loader: 'svg-inline-loader', exclude: '/node_modules/' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      bundlePath: debug ? path.resolve(__dirname, 'Public/[name].min.js') : path.resolve(__dirname, 'Public/dist/[name].min.js'),
      template: 'Public/index.html'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          priority: -20,
          reuseExistingChunk: true,
        },
        src: {
          name: 'sources',
          test: /[\\/]Src[\\/]/,
          reuseExistingChunk: true,
        }
      }
    }
  },
  performance: {
    maxEntrypointSize: 230000,
    maxAssetSize: 230000
  }
};
