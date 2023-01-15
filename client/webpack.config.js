const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.
module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin'
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js'
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'text editor that runs in the browser',
        background_color: '#272822',
        theme_color: '#272822',
        start_url: './',
        publicPath: './',
        icons: [
            {
                src: path.resolve('./favicon.ico'),
                sizes: [48],
                destination: path.join('assets', 'icons')
            },
            {
                src: path.resolve('./favicon.ico'),
                size: '48x48',
                destination: path.join('assets', 'icons'),
                purpose: 'maskable'
            },
            {
                src: path.resolve('src/images/logo.png'),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: path.join('assets', 'icons')
            }
        ]
    })
    ],

    module: {
      rules: [
        {
            // rules for CSS bundling
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        },
        {
            // rules for images bundling
            test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
            type: 'asset/resource'
        },
        {
            // babel loader
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', { targets: "defaults" } ]
                    ]
                }
            }
        }
        
      ],
    },
  };
};
