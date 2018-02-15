import React, { Component } from 'react';
import { Loader, Header, Image, Dropdown, Form, Icon, Button, Divider, Segment } from 'semantic-ui-react'
import logo from '../../logo.svg';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import swal from 'sweetalert2'

// const sendmail = require('sendmail')();

const contactOptions = [
  { key: 'sbc', text: 'SBC', value: 'swarthmoresbc@gmail.com' },
  { key: 'sgo', text: 'SGO', value: 'sgo@swarthmore.edu' },
]



const ContactForm = (props) => {
    const {handleSubmit, handleChange, name, message, email, recipient} = props

    return (
        <div>
        <Form onSubmit={handleSubmit}>
            <Form.Select label='To' fluid options={contactOptions} placeholder='To: recipient' name='recipient' value={recipient} onChange={handleChange} />
            <Form.Group>
                <Form.Input label='Name' width={4} placeholder='Name' name='name' value={name} onChange={handleChange} />
                <Form.Input label='Your Email' required width={4} placeholder='...@swarthmore.edu' name='email' value={email} onChange={handleChange} />
            </Form.Group>
            <Form.TextArea label='Your Message' required placeholder='Message' name='message' value={message} onChange={handleChange} />
            <Form.Button content='Submit' />
        </Form>
        </div>
    );
}


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
        }, 10)
        //   .then(res => res.json())
        //   .then(users => this.setState({ users }));
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    handleSubmit = () => {
        const { recipient, name, email, message} = this.state
        this.setState({ submittedRecipient: recipient,submittedName: name, submittedEmail: email, submittedMessage: message })
        swal({title:"Thank you!", text:"Your message has been sent!", type:"success"})

        // sendmail({
        //     from: 'no-reply@yourdomain.com',
        //     to: 'jjin3@swarthmore.edu',
        //     subject: 'test sendmail',
        //     html: 'Mail of test sendmail ',
        //   }, function(err, reply) {
        //     console.log(err && err.stack);
        //     console.dir(reply);
        // });
    }

    render() {
        const {loading, name, message, email, recipient} = this.state
        const formProps = {recipient, name, message, email, handleChange: this.handleChange, handleSubmit: this.handleSubmit}
        const {match} = this.props
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
                    <Header size='huge'>Contact Us</Header>
                    <Divider />
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
)(Contact)
