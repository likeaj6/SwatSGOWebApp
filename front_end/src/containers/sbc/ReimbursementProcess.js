import React, { Component } from 'react';
import { Button, Segment, Header, Divider, Card } from 'semantic-ui-react'
import links from './links'

function mapReimbursementStepsToComponent(step, index) {
    const { key, icon, description, actions, title, link, style } = step
    // var cardHeight = height == null ? '24rem':height
    // var cardWidth = width == null ? '15rem':width
    var buttons = []
    actions.forEach((action, key) => {
        buttons.push(<Button as='a' key={action+key} href={link[key]} attached='bottom' color='red' content={action}/>)
    })
    return (
        <Segment key={key+index}>
            <Card
                className='StepCards'
                raised
                fluid={window.innerWidth <= 1000}
                color='red'
                extra={buttons}
                description={<Card.Description textAlign='center' content={description}/>}
                header={<Header textAlign='center'>{title}<Divider/></Header>}
            />
        </Segment>
    );
}

const ReimbursementSteps = [
    {
        key: 'download',
        icon: 'users',
        title: '1. Download Form',
        style: {
            color: '#4183c5'
        },
        description: 'Download the general payment form below.',
        actions: ['Download Form'],
        link: [links.reimbursementForm],
        index: '0'
    },
    {
        key: 'fill',
        icon: 'address card outline',
        title: '2. Fill out the form',
        style: {
            color: '#4183c5'
        },
        description: 'Use the Subcodes and Club & Organization Numbers linked below.',
        actions: ['Subcodes', 'Club & Org Numbers'],
        to: '/resources/chartering',
        link: [links.subCodes, links.clubNumbers],
        index: '1'
    },
    {
        key: 'add',
        icon: 'sitemap',
        title: '3. Add your receipts',
        description: 'Please make sure to have your form and receipts put into a single PDF file. The first page of the PDF file should always be the reimbursement form.',
        actions: [],
        link: true,
        index: '2'
    },
    {
        key: 'format',
        icon: 'dollar',
        title: '4. Format your form',
        to: '/resources/funding',
        description: 'Title your PDF file in the following format: "[the name of whom were to receive the reimbursed amount] ([your student group\'s name])". For example, "John_Doe(SBC)".',
        style: {
            color: '#4183c5'
        },
        actions: [],
        link: true,
        index: '3'
    },
    {
        key: 'send',
        icon: 'currency',
        title: '5. Send It!',
        style: {
            color: '#4183c5'
        },
        to: '/resources/sbc',
        actions: [],
        description: 'Send that single PDF file, which contains both the form and receipts, to SBC Office via email swarthmoresbc@gmail.com.',
        link: true,
        index: '4'
    },
]
const ServicePaymentSteps = [
    {
        key: 'download',
        icon: 'users',
        title: '1. Complete steps 1-3 above',
        width: '19em',
        description: 'Please note that we use the same form for reimbursements and service payments. Instead of receipts, you must submit an invoice or other documents detailing the payment amount.',
        actions: ['Download Form'],
        link: [links.reimbursementForm],
        index: '0'
    },
    {
        key: 'format',
        icon: 'dollar',
        title: '2. Title your form',
        to: '/resources/funding',
        description: 'Title your PDF file in the following format: "[your payee\'s name]([your student group\'s name])". For example, "Manager_XYZ(SBC)"',
        width: '19em',
        actions: [],
        link: true,
        index: '3'
    },
    {
        key: 'format',
        icon: 'dollar',
        title: '3. Fill out & Sign Instructor Contract',
        to: '/resources/funding',
        description: 'Ask your payee to sign the Contract. Please note that you are required to submit this document for different and new payees regardless of whether or not you have submitted a similar document in the past. You do not need to submit the contract again when you request service payment for the same payee.',
        width: '19em',
        actions: [],
        link: true,
        index: '3'
    },
    {
        key: 'send',
        icon: 'currency',
        title: '4. Send It!',
        width: '19em',
        to: '/resources/sbc',
        actions: [],
        description: 'Send the Contract and the PDF file, which contains both the form and invoice, to Office via email swarthmoresbc@gmail.com. Please note that they should be 2 separate files.',
        link: true,
        index: '4'
    },
]

class ReimbursementTab extends Component {
    constructor(props) {
        super(props);
        this.state = { isMobile: window.innerWidth <= 1000}
        this.resize = this.resize.bind(this)
    }
    componentDidMount() {
        window.addEventListener("resize", this.resize);
        this.resize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
    }

    resize() {
        this.setState({isMobile: window.innerWidth <= 1000});
    }
    render() {
        const {isMobile} = this.state
        return (
            <div>
                <Segment content='Please follow the below instructions and send us ALL payment requests via email unless specified otherwise. If you have any concerns about submitting your files online, please contact us in advance. We will only accept payment requests during office hours in situations where prompt SBC actions are deemed to be necessary.'/>
                <Header as='h2' content='Reimbursement Process' textAlign='center' />
                <Segment.Group horizontal={!isMobile}>
                    {ReimbursementSteps.map(mapReimbursementStepsToComponent)}
                </Segment.Group>
                <Header as='h2' content='Service Payment Process' textAlign='center' />
                <Segment.Group horizontal={!isMobile}>
                    {ServicePaymentSteps.map(mapReimbursementStepsToComponent)}
                </Segment.Group>
            </div>
        )
    }
}

export default ReimbursementTab
