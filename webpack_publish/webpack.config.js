const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    // 默认不压缩
    mode: 'none',
    entry: {
        'large-number': './src/index.js',
        'large-number.min': './src/index.js'
    },
    output: {
        filename: '[name].js',
        // import [largeNumber] from XX
        library: 'largeNumber',
        // 支持多种引入方式
        libraryTarget: 'umd',
        // import后不需要.default来使用
        libraryExport: 'default'
    },
    optimization: {
        // 压缩代码
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/
            })
        ]
    }
}