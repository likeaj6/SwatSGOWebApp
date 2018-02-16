import React, { Component } from 'react';
import text from './text'
import links from './links'
import { Segment, List, Label, Loader, Header, Message, Image, Popup, Icon, Button, Divider } from 'semantic-ui-react'



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
                                <Button color='red' href={links.oseinterns} content='OSE Intern Info'/>
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

export default EventPlanningPanel
