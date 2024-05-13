/**
 * Webpack main configuration file
 */

const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { extendDefaultPlugins } = require('svgo');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const FileManagerPlugin = require('filemanager-plugin').WebpackFilemanager;


const environment = require('./configuration/environment');

const templateFiles = fs.readdirSync(environment.paths.source)
  .filter((file) => path.extname(file).toLowerCase() === '.html');

const htmlPluginEntries = templateFiles.map((template) => new HTMLWebpackPlugin({
  inject: true,
  hash: false,
  filename: template,
  template: path.resolve(environment.paths.source, template),
  favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico'),
}));

module.exports = {
  entry: {
    app: path.resolve(environment.paths.source, 'js', 'app.js'),
  },
  output: {
    filename: 'more-premium/js/[name].[contenthash:6].js', // ??
    path: environment.paths.output,
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {sourceMap: true},
          },
          {
            loader: 'postcss-loader',
            options: {sourceMap: true},
          },
          {
            loader: 'sass-loader',
            options: {sourceMap: true},
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {presets: ['@babel/preset-env']},
        },
      },
      {
        test: /\.svg$/,
        include: [
                path.resolve(environment.paths.source, 'images', 'sprites'),
              ],
        loader: 'svg-sprite-loader',
        options: {
          extract: false,
        },
      },
      {
        test: /\.(png|gif|jpe?g|svg|webp)$/i,
        exclude: [
                path.resolve(environment.paths.source, 'images', 'sprites'),
              ],
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'more-premium/images/design/[name].[hash:6].[ext]',
              publicPath: '../../',
              limit: environment.limits.images,
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'more-premium/fonts/[name].[hash:6].[ext]',
              publicPath: '../../',
              limit: environment.limits.fonts,
            },
          },
        ],
      },
      {
        test: /\.ya?ml$/,
        type: 'json',
        use: 'yaml-loader',
      },
      {
        test: /\.hbs$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new FileManagerPlugin({
      events: {
        end: {
          copy: {
            items: [
              { source: './dist/more-premium/**/*', destination: './dist', isFlat: false}
            ]
          }
        }
      }
    }),
    new SpriteLoaderPlugin({ plainSprite: true }),
    new MiniCssExtractPlugin({
      filename: 'more-premium/css/[name][contenthash:6].css',
    }),
    new ImageMinimizerPlugin({
      test: /\.(jpe?g|gif|svg)$/i, // |png
      exclude: ['./src/images/content/sequence/**/*'],
      minimizerOptions: {
        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          [
            'svgo',
            {
              plugins: extendDefaultPlugins([
                {
                  name: 'removeViewBox',
                  active: false,
                },
              ]),
            },
          ],
        ],
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/images/content/', to: 'more-premium/images/content'},
        { from: 'src/audio', to: 'more-premium/audio' },
        { from: 'src/video', to: 'more-premium/video' },
        { from: 'src/robots.txt', to: 'more-premium' }
      ]
    }),
  ].concat(htmlPluginEntries),
  target: 'web',
  resolve: {
      alias: {
        handlebars: 'handlebars/dist/handlebars.min.js'
      }
  }
};
