var path = require('path');
var webpack = require('webpack-stream').webpack;
var src = require('./src');
var fs = require('fs');
var path = require('path')
var examples = require('../conf/examples');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var babelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../../.babelrc')));

var projectRoot = path.join(__dirname, '../..');



module.exports = {
    context: projectRoot,
    cache: true,
    entry: examples,
    output: {
        path: path.join(__dirname + '/../..', src.dist),
        publicPath: 'dist/',
        filename: '[name].js',
        chunkFilename: '[chunkhash].js'
    },
    module: {
        loaders: [
            {test: /\.css$/,    loader: ExtractTextPlugin.extract('style-loader', 'css')},
            {test: /\.scss$/i, loader: ExtractTextPlugin.extract('style-loader', ['css','sass'])},
            {test: /\.less$/i, loader: ExtractTextPlugin.extract('style-loader', ['css','less'])},

            // required for bootstrap icons
            { test: /\.woff2?$/,   loader: 'url-loader?prefix=font/&limit=5000&mimetype=application/font-woff' },
            { test: /\.ttf$/,    loader: 'file-loader?prefix=font/' },
            { test: /\.eot$/,    loader: 'file-loader?prefix=font/' },
            { test: /\.svg$/,    loader: 'file-loader?prefix=font/' },

            { test: require.resolve("react"), loader: "expose?React" },


            // required for babel
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: babelConfig
            }
        ]
    },
    resolve: {
        modulesDirectories:[
          'node_modules',
          'web_modules',
          projectRoot
        ],

        alias: {
            'react-rx-components': 'src/main/js/index.js'
        }
    },


    plugins: [
        new webpack.ProvidePlugin({
            // Automatically detect jQuery and $ as free var in modules
            // and inject the jquery library
            // This is required by many jquery plugins
            jQuery: 'jquery',
            $: 'jquery',
        }),

        new ExtractTextPlugin('stylesheets/[name].css'),
    ]
};