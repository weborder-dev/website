const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const entryScript = 'src/app.ts';
const entryHTML = 'src/index.html';

const typeScriptRules = {
  test: /\.ts$/,
  use: 'ts-loader',
  include: [path.resolve(__dirname, 'src')]
};

const assetRules = {
  test: /\.(png|jpg|jpeg|gif)$/i,
  type: 'asset/resource'
};

const htmlRules = {
  test: /\.html$/i,
  use: 'html-loader'
};

module.exports = {
  entry: {
    main: path.resolve(__dirname, entryScript)
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: entryHTML,
      minify: {
        minifyCSS: true,
        minifyJS: true
      }
    })
  ],
  module: {
    rules: [typeScriptRules, assetRules, htmlRules]
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'scripts/[name].bundle.js',
    assetModuleFilename: 'assets/[name].[hash][ext][query]',
    clean: true
  }
};
