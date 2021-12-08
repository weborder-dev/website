const path = require("path");

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src/index.ts')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        publicPath: 'public/js',
        path: path.resolve(__dirname, 'public/js'),
        filename: 'main.bundle.js',
        clean: true
    }
}