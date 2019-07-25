var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var VueLoaderPlugin = require('vue-loader/lib/plugin')
var  fs =  require('fs')

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, '../src/view/index.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'index.js'
    },
    node: {
        fs: 'empty'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../src/index.html'),
                // filename: 'index'
        }),
        new VueLoaderPlugin()
    ]

}

