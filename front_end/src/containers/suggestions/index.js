import React, { Component } from 'react';
import {Form, List, Loader, Header, Icon, Divider, Segment } from 'semantic-ui-react'
import { Route, Redirect } from 'react-router'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

const SuggestionsForm = (props) => {
    return (
        <div>
            <Header textAlign='center' content='Write us a note or suggestion!'/>
            <Segment>
            <Form onSubmit={props.handleSubmit}>
                <Form.Group>
                    <Form.Input placeholder='Name' name='name' value={props.name} onChange={props.handleChange} />
                    <Form.Input placeholder='Email' name='email' value={props.email} onChange={props.handleChange} />
                </Form.Group>
                <Form.TextArea required placeholder='Note' name='note' value={props.note} onChange={props.handleChange} />
                <Form.Button content='Submit' />
            </Form>
            </Segment>
        </div>
    );
}

class Suggestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', email: '', submittedName: '', submittedEmail: '', note: '', submittedNote: ''
        }

    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { name, email, note} = this.state
        alert(note)
        this.setState({ submittedName: name, submittedEmail: email, submittedNote: note })
    }

    componentDidMount() {
        fetch('/')
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 300)
    }

    render() {
        const {loading, feed} = this.state
        const {match} = this.props
        // console.log(this.panes)
        // const tabPanes = panes
        // console.log(ResourcesTab)
        var content;
        if (loading) {
             content = <div><Loader active={loading}>
                <Header>Just one second</Header>
                <p>We are fetching that content for you.</p>
            </Loader></div>
        } else {
            content = <div><Route path={`${match.url}`} component={(props, panes) => <SuggestionsForm {...props} />}/>
            </div>
        }
        return (
            <div>
                <div className="App-header">
                    <Header size='huge'>Suggestions Box</Header>
                    <Divider/>
                </div>
                <div className="App-intro">
                    {content}
                </div>

            </div>
        );
    }

}

export default Suggestions
