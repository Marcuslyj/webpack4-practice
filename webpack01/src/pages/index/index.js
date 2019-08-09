import React from 'react';
import ReactDOM from 'react-dom'
import '../../../styles/reset/reset.css'
import './index.less'
import img1 from '../../assert/img/微信图片_20190627183624.jpg';
import img2 from '../../assert/img/if_Halloween-06_355959.png'



class Home extends React.Component {
    render() {
        return (
            <div>
                <span>财务得福后果额</span>
                <div className="h">Home Page</div>
                <img className="img1" src={img1} />
                <i class="web-font">英雄难过美人关，我不是英雄，美人让我过了关</i>
                <img className="img1" src={img2} />
            </div>
        )

    }
}

ReactDOM.render(
    <Home />,
    document.getElementById('root')
)