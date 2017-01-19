import React from 'react';
import U from './utils';
import EventList from './EventList';

const MRDashboard = (props) => {
    if(props.events === undefined || props.events[0] === undefined)
        return <span></span>

    return (            
        <div>
            <h4>Event List</h4>
            { props.events.map(event => 
                  {return <EventList key={U.guid()} event={event} />}
            )} 
        </div>
    );
}

export default MRDashboard;