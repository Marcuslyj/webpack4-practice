import React from 'react';
import ReactDOM from 'react-dom'
import './index.css'

class Home extends React.Component {
    render() {
        return <div className="h">Home Page</div>
    }
}

ReactDOM.render(
    <Home />,
    document.getElementById('root')
)