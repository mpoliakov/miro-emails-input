const path = require('path');

module.exports = {
  entry: [
    './src/components.js'
  ],
  output: {
    path: path.join(__dirname, 'dist', 'components'),
    filename: 'components.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'src')
        ],
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ],
  },
  optimization: {
    minimize: true
  }
};
