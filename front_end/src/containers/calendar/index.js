import React, { Component } from 'react';
import { Loader, Header, Image, Divider, Container } from 'semantic-ui-react'
import logo from '../../logo.svg';
import { push } from 'react-router-redux'

import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import EventCards from './Events'
import eventUrls from './data/events'


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import 'react-big-calendar/lib/css/react-big-calendar.css'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            events: []
        }
    }
    componentDidMount() {
        Object.values(eventUrls).map(async val => {
            let r = await fetch(val, { mode: `cors` })
            let { items } = await r.json()
            var events = []
            items.map((event) => {
                events.push({
                    location: event.location,
                    start: moment(event.start.dateTime).toDate(),
                    end: moment(event.end.dateTime).toDate(),
                    title: event.summary,
                })
            })
            this.setState({
                events: events,
                loading: false
            })
        })
    }

    render() {
        const {loading, events} = this.state
        var content;
        if (loading) {
             content = <div><Loader active={loading}>
                <Image size="medium" src={logo}/>
                <Header>Just one second</Header>
                <p>We are fetching that content for you.</p>
            </Loader></div>
        } else {
            content = <div>

            <BigCalendar
            style={{height: '35em'}}
            events={events}/>
            <Header textAlign='center' content='Upcoming Events'/>
            <Divider/>
            <EventCards events={events}/>
            </div>;
        }
        return (
            <div>
                <div className="App-header">
                    <Header textAlign='center' size='huge'>Calendar</Header>
                    <Divider/>
                </div>
                <div className="App-intro">
                    <Container id='0'>
                        {content}
                    </Container>
                </div>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/about-us')
}, dispatch)

export default connect(
    null,
    mapDispatchToProps
)(Calendar)
