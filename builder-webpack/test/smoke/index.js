const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');

// 进入template目录
process.chdir(path.join(__dirname, 'template'));

// 删除dist目录
rimraf('./dist', () => {
    const prodConfig = require('../../lib/webpack.prod.js');

    webpack(prodConfig, (err, stats) => {
        if (err) {
            console.log(err);
            process.exit(2);
        }
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false
        }));

    })


})
