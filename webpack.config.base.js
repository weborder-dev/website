const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
const fs = require('fs');
const path = require("path");
const entryScript = 'src/app.ts';
const pagesWebpack = [];

// General Rules
const typeScriptRules = {
   test: /\.ts$/,
   use: 'ts-loader',
   include: [path.resolve(__dirname, 'src')]
};
const htmlRules = {
   test: /\.html$/i,
   use: 'html-loader'
};

// Pages/Views
const views = fs.readdirSync('./src/views');
views.forEach((view) => {
   if (view.charAt(0) != '_') {
      pagesWebpack.push(new HtmlWebpackPlugin({
         filename: view,
         template: 'src/views/_template.html'
      }));

      pagesWebpack.push(new HtmlWebpackPartialsPlugin({
         path: path.join(__dirname, './src/views/_navigation.html'),
         location: 'navigation'
      }));

      pagesWebpack.push(new HtmlWebpackPartialsPlugin({
         path: path.join(__dirname, './src/views/' + view),
         location: 'content',
         template_filename: view
      }));
   }
});

pagesWebpack.push(new CopyWebpackPlugin({
   patterns: [{
      from: 'src/assets',
      to: 'assets'
   }]
}));

pagesWebpack.push(
   new ExtraWatchWebpackPlugin({
      dirs: [path.join(__dirname, 'src/views')],
   }),
);

module.exports = {
   entry: {
      main: path.resolve(__dirname, entryScript)
   },
   plugins: pagesWebpack,
   module: {
      rules: [typeScriptRules, htmlRules]
   },
   output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'scripts/[name].bundle.js',
      assetModuleFilename: 'assets/[name].[hash][ext][query]',
      clean: true
   }
};