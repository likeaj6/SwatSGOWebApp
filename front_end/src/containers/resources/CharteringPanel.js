import React, { Component } from 'react';
import text from './text'
import links from './links'
import { Segment, List, Label, Loader, Header, Message, Image, Popup, Icon, Button, Divider } from 'semantic-ui-react'


class CharteringPanel extends Component {
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
        return (
            <div>
            <Header content='How do I get my club chartered?' textAlign='center' />
                <Segment.Group attached='top' stackable vertical>
                    <Segment>
                        <Header content='1. Statement of Interest' textAlign='center' />
                        <Divider/>
                        <Segment.Group horizontal={!isMobile}>
                            <Segment textAlign='center'>
                                {text.CharteringSteps.StepOne}
                            </Segment>
                            <Segment>
                                <Button fluid color='red' href={links.statementOfInterst} content='Complete Statement of Interest'/>
                            </Segment>
                        </Segment.Group>
                    </Segment>
                    <Segment>
                        <Header content='2. Liaison Review' textAlign='center' />
                        <Divider/>
                        <Segment.Group horizontal={!isMobile}>
                            <Segment textAlign='center'>
                                {text.CharteringSteps.StepTwo}
                            </Segment>
                            <Segment>
                                <Button fluid color='red' href={links.socEmail} content='Contact Student Orgs'/>
                            </Segment>
                        </Segment.Group>
                    </Segment>
                    <Segment>
                        <Header content='3. Seed Funding (Optional)' textAlign='center' />
                        <Divider/>
                        <Segment.Group horizontal={!isMobile}>
                            <Segment textAlign='center'>
                                {text.CharteringSteps.StepThree}
                            </Segment>
                            <Segment>
                                <Button fluid color='red' href={links.socFundingForm} content='View Funding Form'/>
                            </Segment>
                        </Segment.Group>
                    </Segment>
                    <Segment>
                        <Header content='4. Draft a Charter' textAlign='center' />
                        <Divider/>
                        <Segment.Group horizontal={!isMobile}>
                            <Segment textAlign='center'>
                                {text.CharteringSteps.StepFour}
                            </Segment>
                            <Segment>
                                <Button fluid color='red' href={links.sampleCharter} content='View Example Charter'/>
                            </Segment>
                        </Segment.Group>
                    </Segment>
                    <Segment>
                        <Header content='5. Approval' textAlign='center' />
                        <Divider/>
                        <Segment.Group horizontal={!isMobile}>
                            <Segment textAlign='center'>
                                {text.CharteringSteps.StepFive}
                            </Segment>
                        </Segment.Group>
                    </Segment>
                    <Segment>
                        <Header textAlign='center'>
                            Have Questions?
                        </Header>
                        <Button fluid color='red' href={links.socEmail} content='Send us an email!'/>
                    </Segment>
                </Segment.Group>
            </div>
        )
    }
}

export default CharteringPanel
