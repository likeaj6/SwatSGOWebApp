import React, { Component } from 'react';
import text from './text'
import links from './links'
import { Segment, List, Label, Header, Message, Card, Icon, Button, Divider } from 'semantic-ui-react'

import { NavLink } from 'react-router-dom'


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

const SBCItems = [
    {
        header: 'Request For Reimbursement/Payment',
        key: 'reimbursement',
        to: '/resources/reimbursement',
        action: 'View Form',
        text: text.SBC.Reimbursement,
    },
    {
        header: 'Request Supplementary Funding',
        key: 'supplementary',
        link: links.supplementaryFunding,
        action: 'View Funding Request Form',
        text: text.SBC.SupplementalFunding,
    },
    {
        header: 'Authorize Non-Treasurer',
        key: 'authorize',
        link: links.nonTreasurerAuthorization,
        action: 'View Authorization Form',
        text: text.SBC.NonTreasurerAuthorization,
    },
]

const SBCDocuments = [
    {
        header: 'SBC Bylaws',
        key: 'bylaws',
        link: links.byLaws,
        action: 'View Bylaws',
        text: text.SBC.ByLaws,
        height: '13rem'
    },
    {
        header: 'Treasuring 101',
        key: 'treasuring',
        link: links.treasuring101,
        action: 'View Document',
        text: text.SBC.Treasuring101,
        height: '13rem'
    },
    {
        header: 'Treasurer Agreement',
        key: 'agreement',
        link: links.treasurerAgreement,
        action: 'View Agreement',
        text: text.SBC.TreasurerAgreement,
        height: '13rem'
    },
]

function printTimes(item, index) {
    return <p>{item}</p>
}
class SBCTab extends Component {
    constructor(props) {
        super(props);
        this.state = { isMobile: window.innerWidth <= 760}
    }
    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    resize() {
        this.setState({isMobile: window.innerWidth <= 760});
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
