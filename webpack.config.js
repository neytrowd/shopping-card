const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const pages = generatePages(['index', 'brand', 'localStore', 'lookBook', 'product', 'signUp', 'admin', 'products', 'orders']);

let isDev = process.env.NODE_ENV === 'development';
let isProd = !isDev;

module.exports = {
   mode: 'development',
   context: path.resolve(__dirname, 'src'),

   entry: {
      index: ['@babel/polyfill', './js/ProductList.js'],
      signUp: ['@babel/polyfill', './js/Auth.js'],
      localStore: ['@babel/polyfill', './js/LocalStore.js'],
      product: ['@babel/polyfill', './js/Product.js'],
      admin: ['@babel/polyfill', './js/Admin.js'],
      products: ['@babel/polyfill', './js/Products.js'],
      brand: ['@babel/polyfill', './js/Brand.js'],
      lookBook: ['@babel/polyfill', './js/LookBook.js'],
      orders: ['@babel/polyfill', './js/Orders.js']
   },

   output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, 'dist')
   },

   devServer: {
      port: 3000,
      hot: true,
      open: true,
      watchContentBase: true
   },

   optimization: {
      splitChunks: { chunks: 'all' }
   },

   devtool: 'source-map',

   plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, 'src/images'),
               to: path.resolve(__dirname, 'dist/images')
            },
            {
               from: path.resolve(__dirname, 'src/fonts'),
               to: path.resolve(__dirname, 'dist/fonts')
            },
            {
               from: path.resolve(__dirname, 'src/css'),
               to: path.resolve(__dirname, 'dist/css')
            }
         ]
      }),
      ...pages
   ],

   module: {
      rules: [
         {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_companents)/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env']
               }
            }
         }
      ]
   }

};

function generatePages(arr) {
   let pages = [];
   arr.forEach((page, index) => {
      pages.push(new HtmlWebpackPlugin({
         template: `./${[page]}.html`,
         filename: `${page}.html`,
         chunks: [page]
      }));
   });
   return pages;
}