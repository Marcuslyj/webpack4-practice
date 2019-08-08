import React from 'react';
import ReactDOM from 'react-dom'

class Home extends React.Component {
    render() {
        return <div>Home Page</div>
    }
}

ReactDOM.render(
    <Home />,
    document.getElementById('root')
)