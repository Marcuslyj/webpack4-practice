const assert = require('assert');

describe('webpack.base.js test case', () => {

    const baseConfig = require('../../lib/webpack.base.js');

    console.log(baseConfig);
    it('entry', () => {
        assert.equal(baseConfig.entry.index, 'D:/testProjects/webpack/webpack4-practice/builder-webpack/test/smoke/template/src/pages/index/index.js')
        assert.equal(baseConfig.entry.search, 'D:/testProjects/webpack/webpack4-practice/builder-webpack/test/smoke/template/src/pages/search/index.js')
    })
})