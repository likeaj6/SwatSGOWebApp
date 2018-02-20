import React, { Component } from 'react';
import { Header, Image, Label, Card, Icon, Button, Segment, Grid, Divider, Container } from 'semantic-ui-react'

function mapMembersToCards(item, index) {
    const {header, text, deadline, actions, link} = item
    return {
        raised: true,
        color:'red',
        extra:<div>{actions.map((action, i) => <Button key={'button'+i} href={link} primary={i == 0} fluid content={action}/>)}</div>,
        key:link,
        description:<Card.Description textAlign='center' content={'Deadline: ' + deadline + '\n' + text}/>,
        header: <Header textAlign='center'>{header}<Divider/></Header>,
    }
}

const newCards = [
]

const exampleCards = [
    {
        header: 'Forum for Free Speech',
        link: 'ffs',
        actions: ['View Form', 'Learn More'],
        deadline: '1/31/18',
        text: '',
    },
    {
        header: 'Test Commitee',
        link: 'tc1',
        actions: ['Get Started'],
        deadline: '',
        text: '',
    },
    {
        header: 'Test Commitee',
        link: 'tc2',
        actions: ['Get Started'],
        deadline: '',
        text: '',
    },
]

const applicationCards = [

]

class Applications extends Component {
    render() {
        const newApplications = newCards.length > 0 ? <Grid.Row> {newCards.map(mapMembersToCards)}</Grid.Row> : null
        const applications = applicationCards.length > 0 ?                 <Card.Group items={applicationCards.map(mapMembersToCards)}/>: <Segment size='massive' content='All committees are currently filled, check back soon!'/>
        return (
            <div>
                {newApplications}
                <Label as='a' color='red' ribbon>Committees Currently Accepting Applications:</Label>
                {applications}
            </div>
        );
    }
}

export default Applications
