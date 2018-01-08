import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux'
import { history } from './store/Store'
import Sidebar from './components/Sidebar'
import Routes from './routes'
import './App.css';

class App extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         loading: true
    //     }
    // }
    // componentDidMount() {
    //     fetch('/')
    //     setTimeout(() => {
    //         this.setState({
    //             loading: false
    //         })
    //     }, 10000)
    //       .then(res => res.json())
    //       .then(users => this.setState({ users }));
    // }

    render() {
        return (
            <div>
                <Sidebar/>
                <Routes/>
            </div>
        );
    }


}


export default App;
