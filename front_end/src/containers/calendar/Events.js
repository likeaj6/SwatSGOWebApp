import React, {Component} from 'react'
import { Card} from 'semantic-ui-react'

import moment from 'moment'

class EventCards extends Component {
    constructor(props) {
        super(props);

    }
    //
    filterAndSort(events) {
        return events.filter(event =>
         moment(event.end) - moment() >= 0).sort((a,b) => moment(a.start) - moment(b.start))
    }

    render() {
        const { events } = this.props
        return (
            <Card.Group>
                {this.filterAndSort(events).map((e, i) =>
                    <Card id={i} fluid raised color='blue' key={e.id+e.start}
                    className={window.location.hash == '#'+ i ? 'shake': ''}
                    header={e.title} meta={e.location} description={'Time: ' + moment(e.start).format('MMMM Do YYYY, h:mm:ss a') + ' - ' + moment(e.end).format('h:mm:ss a')}/>
                )}
            </Card.Group>
        );
    }
}


export default EventCards
