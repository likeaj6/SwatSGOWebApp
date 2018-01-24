import React, { Component } from 'react';
import { Tab, Menu, Accordion, Step, Card, Modal, Segment, Embed, List, Label, Loader, Header, Message, Image, Popup, Icon, Container, Button, Divider } from 'semantic-ui-react'
import text from './text'
import links from './links'
import committees from './committees'


const GroupsTab = () => {
    return (
        <Tab.Pane>
            <Header size='small' block icon textAlign='center'>
                <Icon name='university' circular />
                Student Groups
            </Header>
            <Divider/>
            <Header size='small' children={text.StudentGroupsIntro}/>
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
                <Icon name='book' circular />

            </Header>
            <br/>
            <br/>
            <BudgetingPanel/>
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
        title: 'Form a Student Group',
        link: false,
        index: '0'
    },
    {
        key: 'charter',
        icon: 'address card outline',
        title: 'Get Chartered',
        // style: {
        //     color: '#4183c5'
        // },
        link: true,
        index: '1'
    },
    {
        key: 'student-orgs',
        icon: 'sitemap',
        title: 'Student Organization Committee',
        link: true,
        index: '2'
    },
    {
        key: 'funding',
        icon: 'dollar',
        title: 'Get Funding',
        description: 'Get Funding',
        link: true,
        index: '3'
    },
    {
        key: 'sbc',
        icon: 'currency',
        title: 'Student Budgeting Committee',
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
        alert(title)
        this.setState({ active: title })
    }

    mapStepItemToComponent(step, index) {
        const { key, icon, title, link, style } = step
        const { active } = this.state
        const hasLink = ['charter', 'funding'].indexOf(key) > -1
        return (
            <Step {...step} active={active === title} onClick={hasLink? this.handleClick:null}/>
        )
    }

    render() {
        return (
            <div>
                <Segment.Group horizontal>
                    <Segment>
                        <Header content='Chartering' textAlign='center' />
                        <Divider/>
                        {text.CharterDescription}
                    </Segment>
                    <Segment>
                        <Header content='Funding' textAlign='center' />
                        <Divider/>
                        {text.FundingDescription}
                    </Segment>
                </Segment.Group>
                <Divider/>

                <Step.Group fluid widths={5} stackable='tablet' items={StudentGroupsItems.map(this.mapStepItemToComponent)}/>
            </div>
        );
    }
}

class BudgetingPanel extends Component {
    render() {
        return (
            <div>
                <Segment.Group attached='top' stackable horizontal width={2}>
                    <Segment>
                        <Header content='Pre-Chartering' textAlign='center' />
                        <Divider/>
                        {text.CharterDescription}
                    </Segment>
                    <Segment textAlign='center'>
                        <Header content='Chartered' textAlign='center' />
                        <Divider/>
                        {text.SBCDescription}
                    </Segment>
                </Segment.Group>
                <Divider/>
                
            </div>
        );
    }
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
                                <Button color='red' href={links.osegraphicdesign} content='OSE Intern Info'/>
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
    GroupsTab, BudgetingTab, EventPlanningTab
}
