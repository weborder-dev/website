const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const path = require("path");

const sassRules = {
    test: /\.scss$/,
    use: [
        'style-loader', 
        'css-loader', 
        'sass-loader'
    ],
    include: [path.resolve(__dirname, 'src')]
};

module.exports = merge(baseConfig, {
    mode: 'development',
    module: {
        rules: [ sassRules ]
    },
});