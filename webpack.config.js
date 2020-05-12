const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'components.css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'src')
        ],
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer'),
                require('cssnano')
              ]
            }
          },
          'less-loader',
        ],
      }
    ],
  },
  optimization: {
    minimize: true
  }
};
