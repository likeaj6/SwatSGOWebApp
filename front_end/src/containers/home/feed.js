import React, { Component } from 'react';
import { Header, Image, Label, Card, Popup, Icon, Button, Segment, Grid, Divider, Container } from 'semantic-ui-react'
import { NavHashLink as NavLink } from 'react-router-hash-link';

function mapItemsToCards(item, index) {
    const {header, text, action, link, to, shouldScroll} = item
    // const hasLink = true
    return (
        <Segment key={item+index}>
            <Card
                fluid
                as={NavLink}
                smooth
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
        to: '/contact#sgo',
        action: 'Get Started',
        text: '',
    },
]

const fundingCards = [
    {
        header: 'Submit a reimbursement form',
        to: '/sbc/reimbursement',
        action: 'Get Started',
        text: '',
    },
    {
        header: 'Interested in SEPTA Tickets for your club?',
        shouldScroll: true,
        to: '/sbc#septa',
        action: 'Get Started',
        text: '',
    },
    {
        header: 'Contact SBC',
        to: '/contact#sbc',
        action: 'Get Started',
        text: '',
    },
]

const generalCards = [
    {
        header: 'When\'s our next meeting?',
        to: '/calendar/',
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
                        <Label color='red' ribbon>General</Label>
                        {actionCards.map(mapItemsToCards)}
                    </Segment.Group>

                    <Segment.Group piled horizontal={!isMobile}>
                        <Popup
                            trigger={<Label as={NavLink} to='/sbc' ribbon>SBC</Label>}
                        content='View SBC Page'
                        position='left center'
                        />

                        {fundingCards.map(mapItemsToCards)}
                        </Segment.Group>

                    <Segment.Group piled horizontal={!isMobile}>
                        <Label color='grey' ribbon>Misc</Label>
                        {generalCards.map(mapItemsToCards)}
                    </Segment.Group>
                </Grid>
            </div>
        );
    }
}

export default Feed
