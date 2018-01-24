import React, { Component } from 'react';
import { Loader, Header, Image, Icon, Button, Divider, Container } from 'semantic-ui-react'
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
        console.log(eventUrls)
        Object.values(eventUrls).map(async val => {
          let r = await fetch(val, { mode: `cors` })
          let { items } = await r.json()
          var events = []
          items.map((event) => {
            events.push({
            location: event.location,
            start: event.start.date || event.start.dateTime,
            end: event.end.date || event.end.dateTime,
            title: event.summary,
            })
        })
          this.setState({
              events: events,
              loading: false
          })
        })
        // fetch(eventUrls).then(results => {
        //     console.log(results)
        // }).then(events => );
        //   .then(res => res.json())
        //   .then(users => this.setState({ users }));
    }

    render() {
        const {loading, feed, events} = this.state
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
                </div>
                <div className="App-intro">
                    <Container>
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
