const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = !process.env.npm_lifecycle_script.includes("webpack --mode production");
const filterImporter = require('node-sass-filter-importer');
const path = require('path');

module.exports = {
  output: {
    publicPath: devMode ? '/' : ''
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {loader : 'sass-loader',
          options: {importer: filterImporter()}
          }
        ],
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: devMode ?  "./index.html" : 'index.html'
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ]
};