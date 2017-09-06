// shared config (dev and prod)
const webpack         = require('webpack');
const {resolve}       = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader');

module.exports = {
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.css'],
  },
  context: resolve(__dirname, 'src'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?modules', 'postcss-loader',],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
      },
    ],
  },
  plugins: [
    new CheckerPlugin()
  ],
  externals: {
  },
  performance: {
    hints: false,
  },
};
