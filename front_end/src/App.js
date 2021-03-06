import React, { Component } from 'react';
import Navbar from './components/Sidebar'
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
        const {history} = this.props
        // console.log(history)
        const path = history.location.pathname
        return (
            <main>
                <Navbar path={path}>
                    <Routes/>
                </Navbar>
            </main>
        );
    }


}


export default App;
