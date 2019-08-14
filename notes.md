## 初识webpack



webpack默认配置文件： webpack.config.js



#### webpack配置组成

![image](./readme/1565246046392.png)







#### 一个简单的例子

初始化一个项目：

```shell
npm init -y
```

安装 webpack webpack-cli





#### entry（依赖图的入口）

![image](./readme/1565247914019.png)



#### output

用来告诉webpack‘如何将编译后的文件输出到磁盘







## Loaders



webpack开箱即用只支持js和json两种文件类型，通过loaders去支持其他文件类型并转化成

有效的模块，可以添加到依赖图中。

本身是一个函数，接受源文件作为参数，返回转换的结果。



#### 常用loaders

![image](./readme/1565249237875.png)





## Plugins

插件用于bundle文件的优化，资源管理和环境变量注入

作用于整个构建过程



#### 常用plugins

![image](./readme/1565249766050.png)







## mode

![image](./readme/1565250368515.png)





## 解析es6

```shell
cnpm i @babel/core @babel/preset-env --save-dev
```





## 解析css

css-loader用于加载.css文件，并转换成commonjs对象

style-loader 将样式通过style标签插入到head中





## less

less-loader 用于见less转成css



## webpack中文件监听

文件监听是在发现源码发生变化时，自动重新构建出新的输出文件。

两种方式：

- webpack命令式，带上--watch参数
- 在配置文件webpack.config.js中设置watch:true

**缺点**：每次需要手动刷新浏览器



#### 文件监听原理分析

轮询判断文件的最后编辑时间是否变化

某个文件发生变化时，并不会立刻告诉监听者。而是先缓存起来等aggregateTimeout

![1565261882998](./readme/1565261882998.png)



## 热更新

#### 方式一：使用webpack-dev-server

WDS不刷新浏览器

WDS不输出文件，而是放在内存中

使用HotModuleReplacementPlugin插件



#### 方式二：使用webpack-dev-middleware

WDM将webpack输出的文件传输给服务器

![1565263513443](./readme/1565263513443.png)





### 热更新原理

![1565263817988](./readme/1565263817988.png)



Bundle server就是服务器，使得文件可以在服务器上访问，如localhost:8080



一般用到websocket







## 文件指纹策略

- Hash：和整个项目的构建相关，只要项目文件有修改，整个项目构建的hash值就会更改
- Chunkhash：和webpack打包的chunk有关，不同的entry会生成不同的chunkhash值
- Contenthash：根据文件内容来定义hash，文件内容不变，则contenthash不变



output文件一般chunkhash

css一般contenthash

图片字体的hash不太一样

![1565264673285](./readme/1565264673285.png)







## 代码压缩

- html压缩

  html-webpack-plugin

- css压缩

  使用optimize-css-assets-webpack-plugin + cssnano

- js压缩

  production默认开启 uglifyjs-webpack-plugin进行压缩





## 清理构建目录

clean-webpack-plugin



## PostCSS插件autoprefixer自动补齐CSS3前缀

postcss-loader + autoprefixer插件，添加browserslist配置项





## 移动端CSS px自动转换成rem

px2rem-loader，将px转rem；

页面渲染时，计算根元素的font-size值，可使用手淘的lib-flexible库；





## 资源内联

意义：

- 代码层面
  - 页面框架的初始化脚本
  - 上报相关打点
  - css内联避免页面闪动
- 请求层面
  - 减少http网络请求，小图片或字体内联（url-loader）



![1565337315094](./readme/1565337315094.png)



css内联：

- 方式一：style-loader
- 方式二：html-inline-css-webpack-plugin



**raw-loader使用0.5版本**

**html-webpack-plugin默认使用ejs模板引擎**





## 多页面打包通用方案

利用glob.sync，动态获取相应入口文件







## sourcemap

通过sourcemap定位到源码

开发环境开启，线上环境关闭



## 提取页面公共资源

1

**思路**：将react、react-dom、基础包通过cdn引入，不打包进bundle中

**方法**：html-webpack-externals-plugin

2

**利用SplitChunksPlugin进行公共脚本分离**，webpack4内置，替代CommonsChunkPlugin

参数:

- async，异步引入的库进行分离（默认）
- initial，同步引入的库进行分离
- all，所有引入的库进行分离

3

**利用SplitChunksPlugin分离基础包**







## tree shaking

引入的模块，tree shaking把用到方法打进bundle，没用到的在uglify阶段被擦除掉



**使用**：webpack默认支持，在.babelrc设置modules:false即可

**要求**：必须是es6语法，cjs方式不支持



production mode默认开启



#### DCE

- 代码不会被执行，不可达
- 代码执行的结果不会被用到
- 代码只会影响死变量（只写不读）





## ScopeHoisting使用和原理分析

**现象**：构建后的代码存在大量闭包代码

**问题**：

- 大量函数闭包包裹代码，导致体积增大（模块越多越明显）
- 运行代码是创建的函数作用域变多，内存开销变大



#### ScopeHoisting原理

将所有模块的代码按照引用的顺序放在一个函数作用域，然后适当的命名一些变量以防止变量名冲突





**使用**：

webpack4，production mode 默认开启

必须是es6语法，cjs不支持







## 代码分割和动态import

#### 场景

- 抽取公用代码
- 脚本懒加载，使得初始下载的代码更小





#### 懒加载js脚本

- CJS： require.ensure
- es6： 动态import（需要babel转换）



使用@babel/plugin-syntax-dynamic-import插件





## 集成ESlint

webpack+eslint



使用eslint-loader ，构建是检查js规范







## webpack打包库和组件

实现一个大整数加法库的打包

- 需要打包压缩版和非压缩版
- 支持AMD、CJS、ESM模块引入





## webpack实现ssr打包

#### ssr是什么

渲染：

html + css + js + data -> 渲染后的html



服务端：

- 所有模板等资源都存储在服务端
- 内网机器拉取数据更快
- 一个html返回所有数据





ssr核心：减少请求

优势：

- 较少白屏时间
- seo友好





## 优化构建时命令行显示的日志

现象：展示一大堆开发者不关注的日志



**friendly-errors-webpack-plugin**







## 功能模块设计

![1565695843948](./readme/1565695843948.png)

![1565696090519](./readme/1565696090519.png)







## 使用eslint规范构建脚本

- 使用eslint-config-airbnb-base
- eslint --fix 自动处理空格







## 冒烟测试

是指对提交测试的软件在进行详细深入的测试之前进行的预测试，目的是暴露导致软件需重新发布的基本功能失效等严重问题



- 构建是否成功
- 每次构建后，build目录是否有文件输出

















































