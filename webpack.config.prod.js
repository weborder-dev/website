const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

const sassRules = {
    test: /\.scss$/,
    use: [
        miniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
    ],
    include: [path.resolve(__dirname, 'src')]
};

module.exports = merge(baseConfig, {
    mode: 'production',
    module: {
        rules: [ sassRules ]
    },
    plugins: [
        new miniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ]
});