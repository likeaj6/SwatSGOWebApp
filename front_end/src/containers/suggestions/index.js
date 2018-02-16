import React, { Component } from 'react';
import {Form, List, Loader, Header, Icon, Divider, Segment } from 'semantic-ui-react'
import { Route, Redirect } from 'react-router'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import swal from 'sweetalert2'

const SuggestionsForm = (props) => {
    const {handleSubmit, handleChange, name, note, email} = props

    return (
        <div>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Input label='Name' width={4} placeholder='Name' name='name' value={name} onChange={handleChange} />
                <Form.Input label='Email' width={4} placeholder='...@swarthmore.edu' name='email' value={email} onChange={handleChange} />
            </Form.Group>
            <Form.TextArea label='Note' required placeholder='Note' name='note' value={note} onChange={handleChange} />
            <Form.Button content='Submit' />
        </Form>
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

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    handleSubmit = () => {
        const { name, email, note} = this.state
        this.setState({ submittedName: name, submittedEmail: email, submittedNote: note })
        swal({title:"Thank you!", text:"Your note has been submitted!", type:"success"})
    }

    componentDidMount() {
        fetch('/')
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 10)
    }

    render() {
        const {loading, name, note, email} = this.state
        const formProps = {name, note, email, handleChange: this.handleChange, handleSubmit: this.handleSubmit}
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
            content = <div><Segment secondary><Header as='h3' textAlign='center' content={'Have a suggestion or issue for us?'}/>
            <Segment tertiary  as='h4' textAlign='center' content={'Send us a note here, and we\'ll do our best to address it as soon as possible! If you want us to get back in touch with you, please enter your email as well.'} />
            <Segment>
                <SuggestionsForm {...formProps}/>
            </Segment>
            </Segment></div>
        }
        return (
            <div>
                <div className="App-header">
                    <Header textAlign='center' size='huge'>Suggestions Box</Header>
                    <Divider/>
                </div>
                <div className="App-intro" style={{marginTop: '5%'}}>
                    {content}
                </div>

            </div>
        );
    }

}

export default Suggestions
