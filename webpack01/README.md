## 初识webpack



webpack默认配置文件： webpack.config.js



#### webpack配置组成

![1565246046392](C:\Users\flnet\AppData\Roaming\Typora\typora-user-images\1565246046392.png)







#### 一个简单的例子

初始化一个项目：

```shell
npm init -y
```

安装 webpack webpack-cli





#### entry（依赖图的入口）

![1565247914019](C:\Users\flnet\AppData\Roaming\Typora\typora-user-images\1565247914019.png)



#### output

用来告诉webpack‘如何将编译后的文件输出到磁盘







## Loaders



webpack开箱即用只支持js和json两种文件类型，通过loaders去支持其他文件类型并转化成

有效的模块，可以添加到依赖图中。

本身是一个函数，接受源文件作为参数，返回转换的结果。



#### 常用loaders

![1565249237875](C:\Users\flnet\AppData\Roaming\Typora\typora-user-images\1565249237875.png)





## Plugins

插件用于bundle文件的优化，资源管理和环境变量注入

作用于整个构建过程



#### 常用plugins

![1565249766050](C:\Users\flnet\AppData\Roaming\Typora\typora-user-images\1565249766050.png)







## mode

![1565250368515](C:\Users\flnet\AppData\Roaming\Typora\typora-user-images\1565250368515.png)







