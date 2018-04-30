var webpack = require('webpack'),
    MyUmdPlugin = require('./library/quaagaJS/plugins/umd'),
    path = require('path');

module.exports = {
    entry: [
        './library/quaagaJS/src/quagga.js'
    ],
    devtool: 'inline-source-map',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    resolve: {
        modules: [
            path.resolve('./library/quaagaJS/src/input/'),
            path.resolve('./library/quaagaJS/src/common/'),
            'node_modules'
        ]
    },
    output: {
        path: __dirname + '/library/quaagaJS/dist',
        publicPath: '/',
        filename: 'quagga.js',
    },
    devServer: {
        contentBase: './',
        hot: true
    },
    plugins: [
        new MyUmdPlugin({
            library: 'Quagga'
        }),
        new webpack.DefinePlugin({
            ENV: require(path.join(__dirname, './library/quaagaJS/env/', process.env.BUILD_ENV))
        })
    ]
};
