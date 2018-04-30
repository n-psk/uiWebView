var path = require('path');
var webpack = require('webpack');

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['source-map-support', 'mocha', 'chai', 'sinon', 'sinon-chai'],
        files: [
            'library/quaagaJS/test/test-main.js',
            {pattern: 'library/quaagaJS/test/spec/**/*.js', included: false}
        ],
        preprocessors: {
            'library/quaagaJS/test/test-main.js': ['webpack']
        },
        webpack: {
            entry: [
                './library/quaagaJS/src/quagga.js'
            ],
            module: {
                loaders: [{
                    test: /\.jsx?$/,
                    exclude: [
                        path.resolve('node_modules/')
                    ],
                    loader: 'babel-loader'
                }, {
                    test: /\.js$/,
                    include: path.resolve('src'),
                    loader: 'babel-istanbul-loader'
                }]
            },
            resolve: {
                modules: [
                    path.resolve('./library/quaagaJS/src/input/'),
                    path.resolve('./library/quaagaJS/test/mocks/'),
                    'node_modules'
                ]
            },
            plugins: [
                new webpack.DefinePlugin({
                    ENV: require(path.join(__dirname, './library/quaagaJS/env/production'))
                })
            ]
        },
        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-coverage',
            'karma-mocha',
            'karma-chai',
            'karma-sinon',
            'karma-sinon-chai',
            'karma-source-map-support',
            require('karma-webpack')
        ],
        reporters: ['progress', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        }
    });
};
