const path = require('path');
const debug = process.env.NODE_ENV !== "production";

console.log(process.env.NODE_ENV);

const appEntry = debug ? [
   path.join(__dirname, 'Src', 'index.js'),
   'webpack-dev-server/client?http://localhost:8080',
   'webpack/hot/only-dev-server'
] : path.join(__dirname, 'Src', 'index.js');

console.log(appEntry);

module.exports = {
    entry: appEntry,
    output: {
        filename: 'client.min.js',
        path: path.resolve(__dirname, 'Public')
    },
    target: 'web',
    resolve: {
        extensions: [ '.css', '.js', '.jsx' ]
    },
    module: {
        rules:[
            { test:/\.js$/ , loader:'babel-loader?compact=false', exclude: '/node_modules/' },
            { test:/\.jsx$/ , loader:'babel-loader?compact=false', exclude: '/node_modules/' },
            { test: /\.css$/, loader: "style-loader!css-loader", exclude: '/node_modules/' },
            { test: /\.png$/, loader: "url-loader", exclude: '/node_modules/', query: { mimetype: "image/png" } },
            { test: /\.jpg$/, loader: "url-loader", exclude: '/node_modules/', query: { mimetype: "image/jpg" } },
            { test: /\.svg$/, loader: 'svg-inline-loader', exclude: '/node_modules/' }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'env', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
                }
            },
            { test:/\.js$/ , loader:'babel-loader', exclude: '/node_modules/', query: {compact: false} }
        ]
    }
};
