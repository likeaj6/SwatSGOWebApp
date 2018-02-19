import React, { Component } from 'react';
import { Tab, Menu, Accordion, Step, Card, Modal, Segment, Embed, List, Label, Loader, Header, Message, Image, Popup, Icon, Container, Button, Divider } from 'semantic-ui-react'
import text from './text'
import links from './links'
import committees from './committees'
import CharteringPanel from './CharteringPanel'
import EventPlanningPanel from './EventPlanningPanel'

import { NavLink, Link} from 'react-router-dom'

function mapItemsToCards(item, index) {
    const {header, text, action, link, to, height} = item
    var as = to == null ? 'a':NavLink
    var cardHeight = height == null ? '17rem':height
    return (
        <Segment>
            <Card
                fluid
                as={as}
                href={link}
                to={to}
                raised
                color='red'
                extra={<Button attached='bottom' as={as} color='red' to={to} href={link} content={action}/>}
                key={index}
                description={<Card.Description textAlign='center' content={text}/>}
                header={<Header textAlign='center'>{header}<Divider/></Header>}
            />
        </Segment>
    );
}

const GroupsTab = () => {
    return (
        <Tab.Pane>
            <Header size='small' block icon textAlign='center'>
                <Icon name='university' circular />
                Student Groups
            </Header>
            <Divider/>
            <Segment>
                <Header size='small' textAlign='center' children={text.StudentGroupsIntro}/>
            </Segment>
            <br/>
            <br/>
            <StudentGroupsPanel/>
         </Tab.Pane>
    );
}

const BudgetingTab = () => {
    return (
        <Tab.Pane>
            <Header size='small' block icon textAlign='center'>
                <Icon name='bitcoin' circular />
                Budgeting for a Student Group
            </Header>
            <br/>
            <br/>
            <BudgetingPanel/>
         </Tab.Pane>
    );
}

const CharteringTab = () => {
    return (
        <Tab.Pane>
            <Header size='small' block icon textAlign='center'>
                <Icon name='edit' circular />
                Chartering
            </Header>
            <Divider/>
            <Segment>
                <Header as='h4' content={text.CharterDescription}               textAlign='center'/>

            </Segment>
            <br/>
            <br/>
            <CharteringPanel/>
         </Tab.Pane>
    );
}

const EventPlanningTab = () => {
    return (
        <Tab.Pane>
            <Header size='small' block icon textAlign='center'>
                <Icon name='idea' circular />
                Event Planning
            </Header>
            <br/>
            <EventPlanningPanel/>
            <br/>
         </Tab.Pane>
    );
}

const StudentGroupsItems = [
    {
        key: 'student-groups',
        icon: 'users',
        title: '1. Form a Student Group',
        link: false,
        index: '0'
    },
    {
        key: 'chartering',
        icon: 'address card outline',
        title: '2. Get Chartered',
        style: {
            color: '#4183c5'
        },
        description: 'Click to view more info',
        to: '/resources/chartering',
        link: true,
        index: '1'
    },
    {
        key: 'student-orgs',
        icon: 'sitemap',
        title: '3. Student Organization Committee',
        link: false,
        index: '2'
    },
    {
        key: 'funding',
        icon: 'dollar',
        title: '4. Get Funding',
        to: '/resources/funding',
        // description: 'Click to view more info',
        // style: {
        //     color: '#4183c5'
        // },
        link: false,
        index: '3'
    },
    {
        key: 'sbc',
        icon: 'currency',
        title: '5. Student Budgeting Committee',
        style: {
            color: '#4183c5'
        },
        to: '/resources/sbc',
        description: 'Click to view more info',
        link: true,
        index: '4'
    },
]


class StudentGroupsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'null',
        }
        this.mapStepItemToComponent = this.mapStepItemToComponent.bind(this);
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
        this.setState({isMobile: window.innerWidth < 992});
    }

    handleClick = (e, { title }) => {
        this.setState({ active: title })
    }

    mapStepItemToComponent(step, index) {
        const { key, icon, title, link, style } = step
        const { active } = this.state
        // const hasLink = ['sbc', 'chartering', 'funding'].indexOf(key) > -1
        const hasLink = ['sbc', 'chartering'].indexOf(key) > -1
        return (
            <Step {...step} active={active === title} as={(hasLink) ? NavLink: null} onClick={hasLink? this.handleClick:null}/>
        )
    }

    render() {
        return (
            <div>
                <Header as='h2' content='Student Group Processes' textAlign='center' />
                <Segment.Group piled horizontal>
                    <Step.Group fluid widths={window.innerWidth < 992 ? 10 : 5 } stackable='tablet' items={StudentGroupsItems.map(this.mapStepItemToComponent)}/>
                </Segment.Group>
                <Divider/>
            </div>
        );
    }
}
const budgetingItems = [
    {
        header: 'Pre-Chartering',
        to: '/resources/chartering',
        action: 'View Student Orgs Resources',
        text: text.PreCharterFundingDescription,
    },
    {
        header: 'Chartered',
        to: '/resources/sbc',
        action: 'View SBC Resources',
        text: text.SBCFundingDescription,
    },
]
class BudgetingPanel extends Component {
    render() {
        return (
            <div>
                <Header content='Are you chartered?' textAlign='center' />
                <Segment.Group piled stackable horizontal={window.innerWidth >= 500} >
                    {budgetingItems.map(mapItemsToCards)}
                </Segment.Group>
                <Divider/>

            </div>
        );
    }
}

function mapReimbursementStepsToComponent(step, index) {
    const { key, icon, description, actions, title, link, style } = step
    // var cardHeight = height == null ? '24rem':height
    // var cardWidth = width == null ? '15rem':width
    var buttons = []
    actions.forEach((action, key) => {
        buttons.push(<Button as='a' href={link[key]} attached='bottom' color='red' content={action}/>)
    })
    return (
        <Segment>
            <Card
                className='StepCards'
                raised
                fluid={window.innerWidth <= 1000}
                color='red'
                extra={buttons}
                key={index}
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
                <Segment.Group stackable horizontal={!isMobile}>
                    {ReimbursementSteps.map(mapReimbursementStepsToComponent)}
                </Segment.Group>
                <Header as='h2' content='Service Payment Process' textAlign='center' />
                <Segment.Group stackable horizontal={!isMobile}>
                    {ServicePaymentSteps.map(mapReimbursementStepsToComponent)}
                </Segment.Group>
            </div>
        )
    }
}




export {
    GroupsTab, ReimbursementTab, CharteringTab, BudgetingTab, EventPlanningTab
}
