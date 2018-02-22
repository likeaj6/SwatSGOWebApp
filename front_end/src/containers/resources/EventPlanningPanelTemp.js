import React, { Component } from 'react';
import text from './text'
import links from './links'
import { Segment, List, Label, Loader, Header, Message, Image, Popup, Icon, Button, Divider } from 'semantic-ui-react'

const planningProcessSteps = [
    {
        header: '1. Planning', text: text.EventPlanningSteps.Planning, actions: [{link: links.osegraphicdesign, content: 'Graphic Design Help'}]
    },
    {
        header: '2. Funding & Services', text: text.EventPlanningSteps.Funding,
        actions: [
            {link: links.osefunding, content: 'OSE Funding Request'},
            {link: links.sgofunding, content: 'SGO Funding Request'}
        ]
    },
    {
        header: '3. Review', text: text.EventPlanningSteps.Review, actions: [{link: links.oseinterns, content: 'OSE Intern Info'}]
    },
    {
        header: '4. Reserve Space', text: text.EventPlanningSteps.Reserve, actions: [{link: links.reserve, content: 'Reserve Space'}]
    },
    {
        header: '5. Enjoy!', text: text.EventPlanningSteps.Enjoy, actions: []
    },
]

function mapStepsToSegment(step, index) {
    const { key, text, actions, header, style } = step
    // var cardHeight = height == null ? '24rem':height
    // var cardWidth = width == null ? '15rem':width
    var buttons = []
    actions.forEach((action, key) => {
        buttons.push(<Button as='a' key={action+key} href={link[key]} attached='bottom' color='red' content={action}/>)
    })
    return (
        <Segment key={key+index}>
        </Segment>
    );
}

class EventPlanningPanel extends Component {
    constructor(props) {
        super(props);
        this.state = { isMobile: window.innerWidth <= 1000, mediumScreen: window.innerWidth <= 1200}
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
        this.setState({isMobile: window.innerWidth <= 1000, mediumScreen: window.innerWidth <= 1200});
    }

    render() {
        const {isMobile, mediumScreen} = this.state

        return (
            <div>
                <Segment.Group>
                    <Segment>
                        <Header content='1. Planning' textAlign='center' />
                        <Divider/>
                        <Segment.Group horizontal={!isMobile}>
                            <Segment textAlign='center'>
                                {text.EventPlanningSteps.Planning}
                            </Segment>
                            <Segment>
                                <Button fluid color='red' href={links.osegraphicdesign} content='Graphic Design Help'/>
                            </Segment>
                        </Segment.Group>
                    </Segment>
                    <Segment>
                        <Header content='2. Funding & Services' textAlign='center' />
                        <Divider/>
                        <Segment.Group horizontal={!isMobile}>
                            <Segment textAlign='center'>
                            {text.EventPlanningSteps.Funding}
                            </Segment>
                            <Segment>
                                <Button.Group fluid vertical attached={window.innerWidth <= 1200 && !isMobile ? 'right': null}>
                                    <Button fluid color='red' href={links.osefunding} content='OSE Funding Request'/>
                                    <Button.Or />
                                    <Button fluid color='red' href={links.sgofunding} content='SGO Funding Request'/>
                                </Button.Group>
                            </Segment>
                        </Segment.Group>
                    </Segment>
                    <Segment>
                        <Header content='3. Review' textAlign='center' />
                        <Divider/>
                        <Segment.Group horizontal={!isMobile}>
                            <Segment textAlign='center'>
                                {text.EventPlanningSteps.Review}
                            </Segment>
                            <Segment>
                                <Button fluid color='red' href={links.oseinterns} content='OSE Intern Info'/>
                            </Segment>
                        </Segment.Group>

                    </Segment>
                    <Segment>
                        <Header content='4. Reserve Space' textAlign='center' />
                        <Divider/>
                        <Segment.Group horizontal={!isMobile}>
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

export default EventPlanningPanel
