import React, { Component } from 'react';
import logo from './logo.svg';
import { Loader, Header, Image, Icon, Button, Divider, Container } from 'semantic-ui-react'
import MainMenu from './Components/MainMenu'
import SideMenu from './Components/SideMenu'
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    componentDidMount() {
        fetch('/')
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 10000)
        //   .then(res => res.json())
        //   .then(users => this.setState({ users }));
    }

    render() {
        const {loading, feed} = this.state
        var content;
        if (loading) {
             content = <div><Loader active={loading}>
                <Image size="medium" src={logo}/>
                <Header>Just one second</Header>
                <p>We are fetching that content for you.</p>
            </Loader></div>
        } else {
            content = feed;
        }
        return (
            <div className="App">
                <div className="App-header">
                </div>
                <SideMenu/>
                {content}
            </div>
        );
    }
}

export default App;
