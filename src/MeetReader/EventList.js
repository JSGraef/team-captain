import React from 'react';
import {Link} from 'react-router';
import U from './utils';

// Lists the individual event
const EventList = (props) => {
    return ( 
         <ul>
            { props.events.map(event => 
                {
                    if(event.length === 0)
                        return null;

                    return (
                        <li key={event[0].eventNum}>
                            <Link to={`/meetreader/events/${event[0].eventNum}`}>{U.parseEventTitle(event[0])}</Link>
                        </li>
                    )
                })}           
        </ul>
    );
}

export default EventList;