// development config
const merge     = require('webpack-merge');
const webpack   = require('webpack');
const {resolve} = require('path');

const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
  entry: [
    'react-hot-loader/patch', // activate HMR for React
    'webpack-dev-server/client?http://localhost:8080',// bundle the client for webpack-dev-server and connect to the provided endpoint
    'webpack/hot/only-dev-server', // bundle the client for hot reloading, only- means to only hot reload for successful updates
    './frontend/index.tsx' // the entry point of our app
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist-dev'),
    publicPath: '/' // necessary for HMR to know where to load the hot update chunks
  },
  devServer: {
    hot: true, // enable HMR on the server
    contentBase: resolve(__dirname, 'dist-dev'), // match the output path
    publicPath: '/' // match the output `publicPath`
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
  ],
});