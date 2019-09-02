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
        new CleanWebpackPlugin({verbose: true})
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
                terserOptions: {
                    parse: {
                        // parse options
                    },
                    // mangle: {
                    //     properties: {
                    //         // mangle property options
                            // reserved: ['const', 'require', 'exports'],
                        // }
                    // },
                    compress: {
                        ecma: 8,
                        ie8: false,
                        drop_console: true,
                    },
                    output: {
                        // output options
                    },
                    sourceMap: {
                        // source map options
                    },
                    ecma: 8, // specify one of: 5, 6, 7 or 8
                    keep_classnames: false,
                    keep_fnames: false,
                    ie8: false,
                    module: false,
                    nameCache: null, // or specify a name cache object
                    safari10: false,
                    toplevel: false,
                    warnings: false,
                    output: {
                        comments: false
                    },
                },
                // extractComments: true
            })
        ],
    }
}