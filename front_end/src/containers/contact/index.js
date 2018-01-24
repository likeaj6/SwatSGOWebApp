import React, { Component } from 'react';
import { Loader, Header, Image, Icon, Button, Divider, Container } from 'semantic-ui-react'
import logo from '../../logo.svg';
import SBWidget from './widget'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const sbWidget = new SBWidget();

class Contact extends Component {
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
        }, 300)
        sbWidget.start('9DA1B1F4-0BE6-4DA8-82C5-2E81DAB56F23');

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
            <div>
                <div className="App-header">
                </div>
                {content}
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
)(Contact)
