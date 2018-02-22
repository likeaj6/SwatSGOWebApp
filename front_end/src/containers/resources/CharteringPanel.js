import React, { Component } from 'react';
import text from './text'
import links from './links'
import { Segment, List, Label, Loader, Header, Message, Image, Popup, Icon, Button, Divider } from 'semantic-ui-react'

const charteringProcessSteps = [
    {
        header: '1. Statement of Interest', text: text.CharteringSteps.StepOne, actions: [{link: links.statementOfInterst, content: 'Complete Statement of Interest'}]
    },
    {
        header: '2. Liaison Review', text: text.CharteringSteps.StepTwo,
        actions: [
            {link: links.socEmail, content: 'Contact Student Orgs'},
        ]
    },
    {
        header: '3. Seed Funding (Optional)', text: text.CharteringSteps.StepThree, actions: [{link: links.socFundingForm, content: 'View Funding Form'}]
    },
    {
        header: '4. Draft a Charter', text: text.CharteringSteps.StepFour, actions: [{link: links.sampleCharter, content: 'View Example Charter'}]
    },
    {
        header: '5. Approval!', text: text.CharteringSteps.StepFive, actions: []
    },
    {
        contact: true, header: 'Have Questions?', actions: [{link: links.socEmail, content:'Send us an email!'}]
    }
]

class CharteringPanel extends Component {
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

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
    }

    resize() {
        this.setState({isMobile: window.innerWidth <= 1000, mediumScreen: window.innerWidth <= 1400});
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
                buttons.push(<Button as='a' fluid key={action.content+i} href={action.link} color='red' content={action.content}/>)
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
        if (step.contact) {
            return (
                <Segment textAlign='center' key={header+index}>
                    <Header content={header} />
                    {buttons}
                </Segment>
            );
        }
        return (
            <Segment textAlign='center' key={header+index}>
                <Header content={header} />
                <Divider/>
                <Segment.Group horizontal={!isMobile}>
                    {text != null ? <Segment textAlign='center' content={text}/> : null}
                    {buttons.length != 0 ? buttonSegments: null}
                </Segment.Group>
            </Segment>
        );
    }

    render() {
        const {isMobile} = this.state
        return (
            <div>
            <Header content='How do I get my club chartered?' textAlign='center' />
                <Segment.Group attached='top' stackable vertical>
                    {charteringProcessSteps.map(this.mapStepsToSegment)}
                </Segment.Group>
            </div>
        )
    }
}

export default CharteringPanel
