var webpack = require('webpack'),
    path = require('path');

module.exports = require('./webpack.config.js');

module.exports.resolve = {
    modules: [
        path.resolve('./library/quaagaJS/lib/'),
        path.resolve('./library/quaagaJS/src/common/'),
        'node_modules'
    ]
};

module.exports.externals = [
    "get-pixels",
    "gl-matrix",
    "lodash",
    "ndarray",
    "ndarray-linear-interpolate"
];
module.exports.output.libraryTarget = "umd";
module.exports.output.library = "Quagga";
module.exports.plugins = [
    new webpack.DefinePlugin({
        ENV: require(path.join(__dirname, './library/quaagaJS/env/', process.env.BUILD_ENV))
    })
];
module.exports.output.path = __dirname + '/library/quaagaJS/lib';
module.exports.output.filename = 'quagga.js';
