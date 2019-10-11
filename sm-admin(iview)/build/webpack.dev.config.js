const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const path = require('path');
const package = require('../package.json');
const proxy = require('http-proxy-middleware');

fs.open('./build/env.js', 'w', function (err, fd) {
    const buf = 'export default "development";';
    try {
        fs.write(fd, buf, 0, 'utf-8', function(err, written, buffer) {});
    }
    catch(err) {
        fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer) {});
    }
});

module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    devServer: {
        historyApiFallback: {
            rewrites: [{
                from: /.*/,
                to: path.posix.join('/', 'index.html')
            }, ],
        },
        proxy: {
            '/upload': {
                target: 'http://192.168.86.59',
                secure:false,
                changeOrigin: true,
            },
            //匹配代理的url
            '/api': {
                // 目标服务器地址
                // target: 'http://120.78.223.114:8688',
                // target: '120.78.223.114：8868',
                // target: 'http://47.105.189.44:8880',
                target: 'http://192.168.86.59:8888',
                //路径重写
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true,
            },
        }
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vender-exten', 'vender-base'],
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title: '厦门金融司法协同中心',
            filename: '../index.html',
            inject: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new CopyWebpackPlugin([{
                from: 'src/components/main/theme-switch/theme'
            },
            {
                from: 'src/components/text-editor/tinymce'
            }
        ], {
            ignore: [
                'text-editor.vue'
            ]
        })
    ]
});