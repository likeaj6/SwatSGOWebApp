import React, { Component } from 'react';
import { Header, Image, Label, Card, Icon, Button, Segment, Grid, Divider, Container } from 'semantic-ui-react'
import { NavLink} from 'react-router-dom'

function mapItemsToCards(item, index) {
    const {header, text, action, link, to} = item
    // const hasLink = true

    return (
        <Segment>
            <Card
                fluid
                as={NavLink}
                to={to}
                raised
                color='red'
                extra={<div><Button fluid content={action}/></div>}
                key={index}
                description={<Card.Description textAlign='center' content={text}/>}
                header={<Header textAlign='center'>{header}<Divider/></Header>}
            />
        </Segment>
    );
}

const featuredCards = [
    // {
    //     header: 'Featured Event of the Week',
    //     link: '',
    //     text: '',
    // }
]

const actionCards = [
    {
        header: 'Planning an event?',
        to: '/resources/event-planning',
        action: 'Get Started',
        text: '',
    },
    {
        header: 'Chartering a club?',
        to: '/resources/chartering',
        action: 'Get Started',
        text: '',
    },
    {
        header: 'Contact Us',
        to: '/contact/',
        action: 'Get Started',
        text: '',
    },
]

const fundingCards = [
    {
        header: 'Submit a reimbursement form',
        to: '/resources/reimbursement',
        action: 'Get Started',
        text: '',
    },
    {
        header: 'How do I get funding for my club?',
        to: '/resources/funding',
        action: 'Get Started',
        text: '',
    },
    {
        header: 'Contact SBC',
        to: '/contact/',
        action: 'Get Started',
        text: '',
    },
]

const generalCards = [
    {
        header: 'Check out our FAQ!',
        to: '/contact/',
        action: 'Take me there!',
        text: '',
    },
    {
        header: 'Send us a suggestion!',
        to: '/suggestions/',
        action: 'Take me there!',
        text: '',
    },
]

// <Header as='h3' color='red' textAlign='center' icon><Icon name='university'/><Header.Content content='SGO'/></Header>

// <Header as='h3' color='red' textAlign='center' icon><Icon name='currency'/><Header.Content content='SBC'/></Header>

    // <Header as='h3' color='red' textAlign='center' icon><Icon name='info'/><Header.Content content='General'/></Header>

class Feed extends Component {
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
        const featured = featuredCards.length > 0 ? <Grid.Row> {featuredCards.map(mapItemsToCards)}</Grid.Row> : null

        return (
            <div>
                <Grid centered relaxed stretched divided container>

                    {featured}
                    <Segment.Group piled horizontal={!isMobile}>
                        <Label as='a' icon='university' color='red' ribbon>General</Label>
                        {actionCards.map(mapItemsToCards)}
                    </Segment.Group>

                    <Segment.Group piled horizontal={!isMobile}>
                        <Label as='a' color='green' ribbon>SBC</Label>
                        {fundingCards.map(mapItemsToCards)}
                        </Segment.Group>

                    <Segment.Group piled horizontal={!isMobile}>
                        <Label as='a' color='grey' ribbon>Misc</Label>
                        {generalCards.map(mapItemsToCards)}
                    </Segment.Group>
                </Grid>
            </div>
        );
    }
}

export default Feed
