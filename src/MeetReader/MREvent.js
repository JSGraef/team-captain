import React, { Component } from 'react';
import Event from './Event';


class MREvent extends Component {

    render() {
        const events = this.props.events;
        const eventid = this.props.routeParams.eventid;

        if(events.length === 1)
            return <h4>Still loading events...</h4>

        let event = {};        

        // e is the array list of swimmers in the event
        for(let e of events) {
            if(e === undefined || e.length === 0)
                continue;
                
            if( e[0].eventNum === eventid) {
                event = e;
                break;
            } 
        }

        if(events.length === 0 || event === {} || event === undefined)
            return <h4>Couldn't find that event</h4>

        return <Event key={event[0].eventNum} event={event} />
    }
}

export default MREvent;