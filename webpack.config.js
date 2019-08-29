const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');


module.exports = {
    devtool: 'source-map',
    target: 'node',
    externals: [nodeExternals()],
    performance: {
        hints: false,
    },
    entry: ['./src/server.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new webpack.ProgressPlugin({
            entries: true,
            modules: true,
            modulesCount: 100,
            profile: true,
            handler: (percentage, message, ...args) => {
                // custom logic
            }
        }),
        // new webpack.HotModuleReplacementPlugin(), // dev
        new CleanWebpackPlugin({verbose: true}),
        // new webpack.ProvidePlugin({
            // Promise: 'es6-promise'
            // Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
            // fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
        // })
    ],
    module: {
        rules: [
            // {
            //     enforce: 'pre',
            //     test: /\.js$/,
            //     exclude: /(node_modules)/,
            //     loader: 'eslint-loader',
            //     options: {
            //         fix: true,
            //     },
            // },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                },
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        }
        ,
        minimizer: [

            new TerserPlugin({
                parallel: true,
                // sourceMap: true,
                minify: (file, sourceMap) => {
                    const extractedComments = [];

                    // Custom logic for extract comments

                    const { error, map, code, warnings } = require('uglify-js') // Or require('./path/to/uglify-module')
                        .minify(file, {
                            /* Your options for minification */
                        });

                    return { error, map, code, warnings, extractedComments };
                },
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
                extractComments: true
            })
        ],
    }
}