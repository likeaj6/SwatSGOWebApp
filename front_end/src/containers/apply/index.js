import React, { Component } from 'react';
import { Loader, Header, Image, Icon, Button, Divider, Container } from 'semantic-ui-react'
import Applications from './applications'
import logo from '../../logo.svg';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Home extends Component {
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
        }, 10)
        //   .then(res => res.json())
        //   .then(users => this.setState({ users }));
    }

    render() {
        const {loading, apply} = this.state
        var content;
        if (loading) {
             content = <div><Loader active={loading}>
                <Image size="medium" src={logo}/>
                <Header>Just one second</Header>
                <p>We are fetching that content for you.</p>
            </Loader></div>
        } else {
            content = <Applications />;
        }
        return (
            <div>
                <div className="App-header">
                    <Header textAlign='center' size='huge'>Apply</Header>
                    <Divider/>
                </div>
                <div className="App-intro" style={{marginTop: '7rem'}}>
                    {content}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/about-us')
}, dispatch)

export default connect(
    null,
    mapDispatchToProps
)(Home)
