const path = require('path')
const HtmlWebpackPlugin =require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    mode: 'development',
    devtool: 'source-map', 
    entry: { 
       a: path.resolve(__dirname, '../src/index.js'),
    //    b: path.resolve(__dirname, '../src/index1.js')
    
},
    output: {
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: '[name].js',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.png$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: '200' * 1024
                    }
                }
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /(node_modules)/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            // filename: path.resolve(__dirname, '../dist/'+ [name] +'.html'),
        }),
        new VueLoaderPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '../dist')
    }       
}