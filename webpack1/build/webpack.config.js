const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Minicssextractplugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, '../src/app.jsx'),
    output: {
        path: path.join(__dirname, '../dist/'),
        filename: 'bundle.[hash:8].js'
    },
    devServer: {
        port: 4000,
        progress: true,
        compress: true,
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true
            }
        }),
        new Minicssextractplugin({
            filename: 'main.css'
        })
        // new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // },
            {
                test: /\.css$/,
                use: [Minicssextractplugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader' ,'less-loader']
            },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
            
                }

            }
        ]
    }    
}