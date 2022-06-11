const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const path = require('path');

const sassRules = {
  test: /\.scss$/,
  use: ['style-loader', 'css-loader', 'sass-loader'],
  include: [path.resolve(__dirname, 'src')]
};

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    watchFiles: ['src/**/*.ts', 'src/**/*.scss', 'src/**/*.html']
  },

  module: {
    rules: [sassRules]
  }
});
