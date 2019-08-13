const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const glob = require('glob')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

// 动态获取多entry和htmlWebpackPlugins
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
    mode: 'production',
    entry,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: [
                    'babel-loader',
                    'eslint-loader'
                ]
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
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
        // 清理构建目录
        new CleanWebpackPlugin(),
        // 分离css
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        // 压缩css
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'react',
                    entry: 'https://cdn.staticfile.org/react/16.3.2/umd/react.production.min.js',
                    global: 'React',
                },
                {
                    module: 'react-dom',
                    entry: 'https://cdn.staticfile.org/react-dom/16.3.2/umd/react-dom.production.min.js',
                    global: 'ReactDOM',
                }, {
                    module: 'echarts',
                    entry: 'https://cdn.staticfile.org/echarts/4.2.1-rc1/echarts.min.js',
                    global: 'echarts'
                }
            ],
        }),
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