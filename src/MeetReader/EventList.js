import React from 'react';
import {Link} from 'react-router';
import U from './utils';

const EventList = (props) => {
    if(props.event[0] === undefined)
        return <span></span>

    return (            
        <div>
            <Link to={`/meetreader/events/${props.event[0].eventNum}`}>{U.parseEventTitle(props.event[0])}</Link>
        </div>
    );
}

export default EventList;