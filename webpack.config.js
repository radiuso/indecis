var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/app/App.js",

  resolve: {
    modulesDirectories: [
      'node_modules',
      'app'
    ]
  },

  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015','react']
      }
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css!sass')
    },
    {
      test: /\.(otf|eot|svg|ttf|woff)/,
      loader: 'url-loader?limit=8192'
    }]
  },

  devServer: {
    contentBase: "./public",
    colors: true,
    historyApiFallback: true,
    inline: true
  }
}

/*
 * If bundling for production, optimize output
 */
if (process.env.NODE_ENV === 'production') {
  config.devtool = false;
  config.plugins = [
    new ExtractTextPlugin('public/app.css', { allChunks: true }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({comments: false}),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  ];
} else {
  config.plugins = [
    new ExtractTextPlugin('public/app.css', { allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ];
}

module.exports = config;
