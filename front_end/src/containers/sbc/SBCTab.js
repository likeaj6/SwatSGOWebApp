import React, { Component } from 'react';
import text from './text'
import links from './links'
import { Segment, List, Label, Header, Message, Card, Icon, Button, Transition, Divider } from 'semantic-ui-react'

import { NavLink } from 'react-router-dom'


function mapItemsToCards(item, index) {
    const {header, text, id, key, actions, links, to, height} = item
    var as = to == null ? 'a':NavLink
    var cardHeight = height == null ? '17rem':height

    var buttons = []
    actions.forEach((action, key) => {
        if (action == 'Or') {
            buttons.push(<Button.Or/>)
        } else {
            buttons.push(<Button as='a' key={action+key} href={links[key]} attached='bottom' color='red' content={action}/>)
        }
    })
    if (actions.length > 1) {
        buttons = <Button.Group widths={actions.length} buttons={buttons}/>
    }

    return (
        <Segment id={id} key={key+index}>
            <Card
                className={window.location.hash == '#'+id ? 'shake': ''}
                fluid
                as={as}
                href={links[0]}
                to={to}
                raised
                color='red'
                extra={buttons}
                description={<Card.Description textAlign='center' content={text}/>}
                header={<Header textAlign='center'>{header}<Divider/></Header>}
            />
        </Segment>
    );
}

const SBCItems = [
    {
        header: 'Request For Reimbursement/Payment',
        key: 'reimbursement',
        to: '/sbc/reimbursement',
        links: [''],
        actions: ['View Process/Form'],
        text: text.SBC.Reimbursement,
    },
    {
        header: 'Request Supplementary Funding',
        key: 'supplementary',
        links: [links.supplementaryFunding, '', links.exampleSupplementaryFunding],
        actions: ['View Funding Proposal Form', 'Or', 'View Example Proposal'],
        text: text.SBC.SupplementalFunding,
    },
    {
        header: 'Authorize Non-Treasurer',
        key: 'authorize',
        links: [links.nonTreasurerAuthorization],
        actions: ['View Authorization Form'],
        text: text.SBC.NonTreasurerAuthorization,
    },
]

const SBCDocuments = [
    {
        header: 'SEPTA Tickets',
        key: 'septa',
        id: 'septa',
        links: [links.septaTickets],
        actions: ['View Form'],
        text: text.SBC.SeptaTickets,
        height: '13rem'
    },
    {
        header: 'SBC Bylaws',
        key: 'bylaws',
        links: [links.byLaws],
        actions: ['View Bylaws'],
        text: text.SBC.ByLaws,
        height: '13rem'
    },
    {
        header: 'Treasuring 101',
        key: 'treasuring',
        links: [links.treasuring101],
        actions: ['View Document'],
        text: text.SBC.Treasuring101,
        height: '13rem'
    },
    {
        header: 'Treasurer Agreement',
        key: 'agreement',
        links: [links.treasurerAgreement],
        actions: ['View Agreement'],
        text: text.SBC.TreasurerAgreement,
        height: '13rem'
    },
]

function printTimes(item, index) {
    return <p key={item+index}>{item}</p>
}

class SBCTab extends Component {
    constructor(props) {
        super(props);
        this.state = { isMobile: window.innerWidth <= 760}
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
        <Segment>
            <Header size='small' block icon textAlign='center'>
                <Icon name='money' circular />
                Student Budgeting Committee
            </Header>
            <Divider/>
            <Segment>
                <Header as='h4' content={text.SBCDescription} textAlign='center'/>
                <Segment>

                    <Segment.Group piled horizontal={!isMobile} size='small' >
                        <Segment compact>
                        <Header as='h4' color='red' content='Contact:'
                        textAlign='center'/>
                        <Divider/>
                        <Button fluid content='Email Us' href={'mailto:'+text.SBC.Email}/>
                        </Segment>
                        <Segment compact>
                        <Header as='h4' color='red' content='Meeting:' textAlign='center'/>
                        <Divider/>
                        <p style={{textAlign:'center'}}><b>{text.SBC.MeetingLocation}</b></p>
                        <Divider/>
                        <p style={{textAlign:'center'}}>{text.SBC.MeetingTime}</p>
                        </Segment>
                        <Segment compact>
                        <Header as='h4' color='red' content='Office Hours:' textAlign='center'/>
                        <Divider/>
                        <p style={{textAlign:'center'}}><b>{text.SBC.OfficeHoursLocation}</b></p>
                        <Divider/>
                        <div style={{textAlign:'center'}}>{text.SBC.OfficeHoursTime.map(printTimes)}</div>
                        </Segment>
                    </Segment.Group>
                </Segment>
            </Segment>
            <Header as='h2' content='What would you like to do?' textAlign='center' />
            <Segment.Group piled horizontal={!isMobile}>
                {SBCItems.map(mapItemsToCards)}
            </Segment.Group>
            <Header as='h2' content='Other resources:' textAlign='center' />
            <Segment.Group piled horizontal={!isMobile} >
                {SBCDocuments.map(mapItemsToCards)}
            </Segment.Group>
        </Segment>
        </div>
        )
    }
}

export default SBCTab
