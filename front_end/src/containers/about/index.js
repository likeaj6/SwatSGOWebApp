import React, { Component } from 'react';
import { Loader, Header, Image, Icon, Button, Divider, Container } from 'semantic-ui-react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class About extends Component {
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

// const mapDispatchToProps = dispatch => bindActionCreators({
// // changePage: () => push('/about-us')
// }, dispatch)

export default connect(
    null,
)(About)
