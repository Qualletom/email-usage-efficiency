const webpack = require('webpack');
const path = require('path');
const env = require('./utils/env');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const environment = env.NODE_ENV || 'dev';
const isDevEnv = environment === 'dev';
const devtool = isDevEnv ? 'source-map' : '';
const mode = isDevEnv ? 'development' : 'production';

const filesToCopy = [
    // {from: './js', to: 'js'},
    // {from: './css', to: 'css'},
    {from: './img', to: 'img'},
];

const config = {
    entry: {
        inline: path.join(__dirname, 'src/inline/', 'inline.js'),
        content: ['babel-polyfill', path.join(__dirname, 'src/content/', 'content.js')],
        background: path.join(__dirname, 'src/background/', 'background.js'),
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'webpack/[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?sourceMap',
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 1000000,
                    name: 'img/[name].[ext]',
                },
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                }),
            },
        ],
    },
    devtool,
    mode,
    // stats: 'verbose',
    // resolve: {
    //     alias: alias,
    //     modules: [
    //         'node_modules',
    //         path.resolve(__dirname, 'src'),
    //     ],
    // },
    plugins: [
        new ProgressBarPlugin({
            format: chalk.green.bold('build [:bar]') + chalk.white.bold(':percent') + ' (:elapsed seconds)',
            clear: false,
        }),
        new WriteFilePlugin(),
        new CopyWebpackPlugin(filesToCopy),
    ],
};

if (!isDevEnv) {
    config.plugins.push(new UglifyJSPlugin({
        parallel: true,
        uglifyOptions: {
            ecma: 8,
            output: {
                comments: false,
                beautify: false,
            },
            compress: {
                collapse_vars: false,
                inline: 0,
            },
            warnings: false,
        },
    }));
}

module.exports = config;
