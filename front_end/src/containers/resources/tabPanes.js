import React, { Component } from 'react';
import { Tab, Menu, Accordion, Step, Card, Modal, Segment, Embed, List, Label, Loader, Header, Message, Image, Popup, Icon, Container, Button, Divider } from 'semantic-ui-react'
import text from './text'
import links from './links'
import committees from './committees'
import CharteringPanel from './CharteringPanel'

import { NavLink, Link} from 'react-router-dom'

function mapItemsToCards(item, index) {
    const {header, text, action, link, to, height} = item
    var cardHeight = height == null ? '17rem':height
    return (
        <Segment>
            <Card
                fluid
                style={{height: cardHeight}}
                as={NavLink}
                to={to}
                raised
                color='red'
                extra={<Button attached='bottom' as={NavLink} color='red' to={to} content={action}/>}
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
        link: true,
        index: '2'
    },
    {
        key: 'funding',
        icon: 'dollar',
        title: '4. Get Funding',
        to: '/resources/funding',
        description: 'Click to view more info',
        style: {
            color: '#4183c5'
        },
        link: true,
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
    }

    handleClick = (e, { title }) => {
        this.setState({ active: title })
    }

    mapStepItemToComponent(step, index) {
        const { key, icon, title, link, style } = step
        const { active } = this.state
        const hasLink = ['sbc', 'chartering', 'funding'].indexOf(key) > -1
        return (
            <Step {...step} active={active === title} as={(hasLink) ? NavLink: null} onClick={hasLink? this.handleClick:null}/>
        )
    }

    render() {
        return (
            <div>
                <Header as='h2' content='Student Group Processes' textAlign='center' />
                <Segment.Group piled horizontal>
                    <Step.Group fluid widths={5} stackable='tablet' items={StudentGroupsItems.map(this.mapStepItemToComponent)}/>
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
                <Segment.Group piled stackable horizontal >
                    {budgetingItems.map(mapItemsToCards)}
                </Segment.Group>
                <Divider/>

            </div>
        );
    }
}

const SBCItems = [
    {
        header: 'Request For Reimbursement/Payment',
        to: '/resources/reimbursement',
        action: 'View Form',
        text: text.SBC.Reimbursement,
    },
    {
        header: 'Request Supplementary Funding',
        to: '/resources/sbc',
        action: 'View Funding Request Form',
        text: text.SBC.SupplementalFunding,
    },
    {
        header: 'Authorize Non-Treasurer',
        to: '/resources/sbc',
        action: 'View Authorization Form',
        text: text.SBC.NonTreasurerAuthorization,
    },
]

const SBCDocuments = [
    {
        header: 'SBC Bylaws',
        to: '/resources/reimbursement',
        action: 'View Bylaws',
        text: text.SBC.ByLaws,
        height: '13rem'
    },
    {
        header: 'Treasuring 101',
        to: '/resources/sbc',
        action: 'View Document',
        text: text.SBC.Treasuring101,
        height: '13rem'
    },
    {
        header: 'Treasurer Agreement',
        to: '/resources/sbc',
        action: 'View Agreement',
        text: text.SBC.TreasurerAgreement,
        height: '13rem'
    },
]

function printTimes(item, index) {
    return <div>
    {item}
    </div>
}

class SBCTab extends Component {
    state = { modalOpen: false }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    render() {
        return (
        <div>
        <Segment>
            <Header size='small' block icon textAlign='center'>
                <Icon name='money' circular />
                Student Budgeting Committee
            </Header>
            <Divider/>
            <Segment>
                <Header as='h4' content={text.SBCDescription} textAlign='center'/>
                <Segment>

                    <Segment.Group piled stackable compact horizontal size='small' >
                        <Segment compact>
                        <Header as='h4' content='Contact:'
                        textAlign='center'/>
                        <Divider/>
                        <Button fluid content='Email Us' href={'mailto:'+text.SBC.Email}/>
                        </Segment>
                        <Segment compact>
                        <Header as='h4' content='Meeting:' textAlign='center'/>
                        <Divider/>
                        <p style={{textAlign:'center'}}><b>{text.SBC.MeetingLocation}</b></p>
                        <Divider/>
                        <p style={{textAlign:'center'}}>{text.SBC.MeetingTime}</p>
                        </Segment>
                        <Segment compact>
                        <Header as='h4' content='Office Hours:' textAlign='center'/>
                        <Divider/>
                        <p style={{textAlign:'center'}}><b>{text.SBC.OfficeHoursLocation}</b></p>
                        <Divider/>
                        <p style={{textAlign:'center'}}>{text.SBC.OfficeHoursTime.map(printTimes)}</p>
                        </Segment>
                    </Segment.Group>
                </Segment>
            </Segment>
            <Header content='What would you like to do?' textAlign='center' />
            <Segment.Group piled stackable horizontal>
                {SBCItems.map(mapItemsToCards)}
            </Segment.Group>
            <Header content='Other resources:' textAlign='center' />
            <Segment.Group piled stackable horizontal >
                {SBCDocuments.map(mapItemsToCards)}
            </Segment.Group>
        </Segment>
        </div>
        )
    }
}

function mapReimbursementStepsToComponent(step, index) {
    const { key, icon, description, actions, title, link, height, style } = step
    var cardHeight = height == null ? '24rem':height
    var buttons = []
    actions.forEach((action, key) => {
        buttons.push(<Button href={'mailto:jjin3@swarthmore.edu'} attached='bottom' color='red' content={action}/>)
    })
    return (
        <Segment>
            <Card
                fluid
                style={{height: cardHeight, width: '15rem'}}
                raised
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
        link: links.reimbursementForm,
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
        link: true,
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

const ReimbursementTab = () => {
    return (
        <div>
            <Segment content='Please follow the below instructions and send us ALL payment requests via email unless specified otherwise. If you have any concerns about submitting your files online, please contact us in advance. We will only accept payment requests during office hours in situations where prompt SBC actions are deemed to be necessary.'/>
            <Header as='h2' content='Reimbursement Process' textAlign='center' />
            <Segment.Group stackable horizontal>
                {ReimbursementSteps.map(mapReimbursementStepsToComponent)}
            </Segment.Group>
            <Header as='h2' content='Service Payment Process' textAlign='center' />
        </div>
    )
}

class EventPlanningPanel extends Component {
    render() {
        return (
            <div>
                <Segment.Group attached='top' stackable vertical>
                    <Segment>
                        <Header content='1. Planning' textAlign='center' />
                        <Divider/>
                        <Segment.Group horizontal>
                            <Segment textAlign='center'>
                                {text.EventPlanningSteps.Planning}
                            </Segment>
                            <Segment>
                                <Button color='red' href={links.osegraphicdesign} content='Graphic Design Help'/>
                            </Segment>
                        </Segment.Group>
                    </Segment>
                    <Segment>
                        <Header content='2. Funding & Services' textAlign='center' />
                        <Divider/>
                        <Segment.Group horizontal>
                            <Segment textAlign='center'>
                            {text.EventPlanningSteps.Funding}
                            </Segment>
                            <Segment>
                            <Button.Group vertical fluid>
                                <Button color='red' href={links.osefunding} content='OSE Funding Request'/>
                                <Button.Or />
                                <Button color='red' href={links.sgofunding} content='SGO Funding Request'/>
                            </Button.Group>
                            </Segment>
                        </Segment.Group>
                    </Segment>
                    <Segment>
                        <Header content='3. Review' textAlign='center' />
                        <Divider/>
                        <Segment.Group horizontal>
                            <Segment textAlign='center'>
                                {text.EventPlanningSteps.Review}
                            </Segment>
                            <Segment>
                                <Button color='red' href={links.oseinterns} content='OSE Intern Info'/>
                            </Segment>
                        </Segment.Group>

                    </Segment>
                    <Segment>
                        <Header content='4. Reserve Space' textAlign='center' />
                        <Divider/>
                        <Segment.Group horizontal>
                            <Segment textAlign='center'>
                                {text.EventPlanningSteps.Reserve}
                            </Segment>
                            <Segment>
                                <Button fluid color='red' href={links.reserve} content='Reserve Space'/>
                            </Segment>
                        </Segment.Group>
                    </Segment>
                    <Segment textAlign='center'>
                        <Header content='5. Enjoy!' textAlign='center' />
                        <Divider/>
                        {text.EventPlanningSteps.Enjoy}
                    </Segment>
                </Segment.Group>
                <Divider/>
            </div>
        );
    }
}




export {
    GroupsTab, ReimbursementTab, CharteringTab, SBCTab, BudgetingTab, EventPlanningTab
}
