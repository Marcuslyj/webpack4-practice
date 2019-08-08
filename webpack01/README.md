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

#### 使用webpack-dev-server

WDS不刷新浏览器

WDS不输出文件，而是放在内存中

使用HotModuleReplacementPlugin插件

