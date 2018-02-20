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
        replace: true,
        to: '/sbc',
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
        const { key, icon, title, link, style, replace} = step
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
        to: '/sbc',
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





export {
    GroupsTab, CharteringTab, BudgetingTab, EventPlanningTab
}
