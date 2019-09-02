const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    target: 'node',
    // mode: 'production',
    externals: [nodeExternals()],
    entry: ['./src/server.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
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
        new CleanWebpackPlugin({verbose: true}),
    ],
    module: {
        rules: [
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
                sourceMap: true,
                minify: (file, sourceMap) => {
                    const extractedComments = [];

                    // Custom logic for extract comments

                    const { error, map, code, warnings } = require('uglify-js') // Or require('./path/to/uglify-module')
                        .minify(file, {
                            /* Your options for minification */
                            compress: {
                                drop_console: true
                            }
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