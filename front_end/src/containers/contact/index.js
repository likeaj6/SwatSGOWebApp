import React, { Component } from 'react';
import { Loader, Header, Image, Form, Divider, Segment } from 'semantic-ui-react'
import logo from '../../logo.svg';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import swal from 'sweetalert2'
import {loaded, handleFormSubmit} from './form-submission-handler'

// const sendmail = require('sendmail')();

const contactOptions = [
  { key: 'sbc', text: 'SBC', value: 'swarthmoresbc@gmail.com' },
  { key: 'sgo', text: 'SGO', value: 'sgo@swarthmore.edu' },
  // { key: 'jjin', text: 'test', value: 'jjin3@swarthmore.edu' },
]



const ContactForm = (props) => {
    const {handleSubmit, handleChange, invalidEmail, name, message, email, recipient} = props

    return (
        <div>
        <Form id='contactForm' action="https://script.google.com/macros/s/AKfycbw5WdJ6CVyDnX9L_ivHrveVp_cRMHK971Ib1d1twtQAIpHj6EQ/exec" as="form" method="POST" onSubmit={handleSubmit}>
            <Form.Select id="contactRecipient" required label='To' fluid options={contactOptions} placeholder='To: recipient' name='Recipient' value={recipient} onChange={handleChange} />
            <Form.Group>
                <Form.Input label='Name' width={5} placeholder='Name' name='Name' value={name} onChange={handleChange} />
                <Form.Input label='Your Email' error={invalidEmail} required width={5} placeholder='...@swarthmore.edu' name='Email' value={email} onChange={handleChange} />
            </Form.Group>
            <Form.TextArea label='Your Message' required placeholder='Message' name='Message' value={message} onChange={handleChange} />
            <Form.Button content='Submit' />
        </Form>
        </div>
    );
}

function validEmail(email) { // see:
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', email: '', recipient: '', submittedName: '', submittedEmail: '', message: '', submittedMessage: ''
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 10)
        loaded()
        if (window.location.hash != '') {
            const recipient = window.location.hash.substring(1)
            const options = contactOptions.map(a => a.key);
            const hashIndex = options.indexOf(recipient)
            if (hashIndex >= 0) {
                const values = contactOptions.map(a => a.value);
                this.setState({
                    recipient: values[hashIndex]
                })
            }
        }
        //   .then(res => res.json())
        //   .then(users => this.setState({ users }));
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name.toLowerCase()]: value, invalidEmail: false })
    }

    handleSubmit = (e) => {
        const { recipient, name, email, message} = this.state
        if (!validEmail(email)) {
            this.setState({ invalidEmail: true})
        } else {
            this.setState({ submittedRecipient: recipient, submittedName: name, submittedEmail: email, submittedMessage: message })
            swal({title:"Thank you!", text:"Your message has been sent!", type:"success"})
        }
    }

    render() {
        const {loading, name, message, email, recipient, invalidEmail} = this.state
        const formProps = {recipient, name, message, invalidEmail, email, handleChange: this.handleChange, handleSubmit: this.handleSubmit}
        // const {match} = this.props
        var content;
        if (loading) {
             content = <div><Loader active={loading}>
                <Image size="medium" src={logo}/>
                <Header>Just one second</Header>
                <p>We are fetching that content for you.</p>
            </Loader></div>
        } else {
            content = <div><Segment secondary><Header as='h3' textAlign='center' content={'Need to reach someone?'}/>
            <Segment tertiary inverted color='red' as='h4' textAlign='center' content={'Send us a message here, and we\'ll get back to you as soon as possible!'} />
            <Segment>
                <ContactForm {...formProps}/>
            </Segment>
            </Segment></div>        }
        return (
            <div>
                <div className="App-header">
                    <Header size='huge' textAlign='center'>Contact Us</Header>
                    <Divider />
                </div>
                <div className="App-intro" style={{marginTop: '5%'}}>
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
)(Contact)
