import React from 'react';
import ReactDOM from 'react-dom';
import '../../../styles/reset/reset.css';
import './index.less';
import largeNumber from 'lyj-large-number';
import img1 from '../../assert/img/微信图片_20190627183624.jpg';
import img2 from '../../assert/img/if_Halloween-06_355959.png';
// import echarts from 'echarts'
import util from '../../common/util';


class Home extends React.Component {
  dynamicImport = async () => {
    const { default: fn } = await import('./d_import.js');
    console.log(fn());
  }

  loadEcharts = async () => {
    const echarts = await util.loadjs('https://cdn.staticfile.org/echarts/4.2.1-rc1/echarts.min.js', 'echarts');

    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'));
    // 指定图表的配置项和数据
    const option = {
      title: {
        text: 'ECharts 入门示例',
      },
      tooltip: {},
      legend: {
        data: ['销量'],
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      }],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }

  render() {
    return (
      <div>
        <span>财务得福后果额1</span>
        <div className="h">Home Page</div>
        <img className="img1" src={img1} alt="" />
        <i className="web-font">英雄难过美人关，我不是英雄，美人让我过了关</i>
        <img className="img1" src={img2} onClick={this.dynamicImport} alt="" />
        <button type="button" onClick={this.loadEcharts}>load echarts</button>
        <div id="main" style={{ width: '600px', height: '400px' }} />
        <div>
自己发布的大整数加法npm包：
          {largeNumber('9999999999', '1')}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Home />,
  document.getElementById('root'),
);
