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
            {or: true},
            {link: links.sgofunding, content: 'SGO Funding Request'},
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


class EventPlanningPanel extends Component {
    constructor(props) {
        super(props);
        this.state = { isMobile: window.innerWidth <= 1000, mediumScreen: window.innerWidth <= 1400}
        this.resize = this.resize.bind(this)
        this.mapStepsToSegment = this.mapStepsToSegment.bind(this)

    }
    componentDidMount() {
        window.addEventListener("resize", this.resize);
        this.resize();
    }
    mapStepsToSegment(step, index) {
        const { key, text, actions, header, style } = step
        const {isMobile, mediumScreen} = this.state
        // var cardHeight = height == null ? '24rem':height
        // var cardWidth = width == null ? '15rem':width
        var buttons = []
        actions.forEach((action, i) => {
            if (action.or == true) {
                buttons.push(                                 <Button.Or />)
            } else {
                buttons.push(<Button as='a' key={action.content+i} href={action.link} color='red' content={action.content}/>)
            }
        })
        var buttonSegments = null
        if (mediumScreen && !isMobile) {
            buttonSegments = <Button.Group fluid vertical attached='right'>
                {buttons}
            </Button.Group>
        } else {
            buttonSegments = (<Segment>
                <Button.Group fluid vertical>
                    {buttons}
                </Button.Group>
            </Segment>)
        }
        return (
            <Segment textAlign='center' key={header+index}>
                <Header content={header} />
                <Divider/>
                <Segment.Group horizontal={!isMobile}>
                    <Segment textAlign='center'>
                        {text}
                    </Segment>
                    {buttons.length != 0 ? buttonSegments: null}
                </Segment.Group>
            </Segment>
        );
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
    }

    resize() {
        this.setState({isMobile: window.innerWidth <= 1000, mediumScreen: window.innerWidth <= 1400});
    }

    render() {
        return (
            <div>
                <Segment.Group>
                    {planningProcessSteps.map(this.mapStepsToSegment)}
                </Segment.Group>
                <Divider/>
            </div>
        );
    }
}

export default EventPlanningPanel
