import React from 'react';
import ReactDOM from 'react-dom'
import './index.less'
import img1 from './assert/img/微信图片_20190627183624.jpg';


class Home extends React.Component {
    render() {
        return (
            <div>
                <div className="h">Home Page</div>
                <img src={img1} />
            </div>
        )

    }
}

ReactDOM.render(
    <Home />,
    document.getElementById('root')
)