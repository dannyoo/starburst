const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = !process.env.npm_lifecycle_script.includes("webpack --mode production");
const filterImporter = require('node-sass-filter-importer');

module.exports = {
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
  plugins: [
    new HtmlWebPackPlugin({
      template: devMode ? "./src/index.html": "./src/index.template.html",
      filename: devMode ?  "./index.html" : 'index.html'
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ]
};