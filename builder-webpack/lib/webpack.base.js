const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')


// 多页面打包，动态获取多entry和htmlWebpackPlugins
const setMPA = () => {
    const entry = {}
    const htmlWebpackPlugins = []

    const entryFiles = glob.sync(path.join(__dirname, './src/pages/*/index.js'))

    Object
        .keys(entryFiles)
        .map(index => {
            const entryFile = entryFiles[index]
            const match = entryFile.match(/src\/pages\/(.*)\/index.js/)
            const pageName = match && match[1]

            entry[pageName] = entryFile
            htmlWebpackPlugins.push(new HtmlWebpackPlugin({
                template: path.join(__dirname, `src/pages/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: [pageName],
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false
                }
            }))
        })

    return { entry, htmlWebpackPlugins }
}

const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
    entry,
    module: {
        // 资源解析，样式增强
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')]
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            // 1rem对应75px
                            remUnit: 75,
                            // px转成rem后的小数点位数
                            remPrecision: 8
                        }
                    }
                ]
            },
            {
                test: /.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')]
                        }
                    },
                    'less-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            // 1rem对应75px，设置设计稿的1/10
                            remUnit: 75,
                            // px转成rem后的小数点位数
                            remPrecision: 8
                        }
                    }
                ]
            },
            {
                test: /.(png|jpe?g|gif)$/,
                // use: 'file-loader'
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        // 分离css
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        // 清理构建目录
        new CleanWebpackPlugin(),
        // 构建日志提示
        new FriendlyErrorsWebpackPlugin(),
        // 错误捕获
        function () {
            this.hooks.done.tap('done', stats => {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1) {
                    console.log('build error');
                    process.exit(1);
                }
            })
        },
        // 动态html
        ...htmlWebpackPlugins
    ],
    stats: 'errors-only'
}