import React, { Component } from 'react';
import Event from './Event';

class MREvents extends Component {

    renderEvent(event) {
        if(event[0] === undefined || event === [])
            return;
        
        return <Event key={event[0].eventNum} event={event} />
    }

    render() {
        return (
            <div>
                { this.props.events.map( e => {return this.renderEvent(e)}) }
            </div>
        );
    }
}

export default MREvents;