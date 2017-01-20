import React from 'react';
import Event from './Event';

// Shows all event cards
const MREvents = (props) => {
    return (
        <div>
            { props.events.map( e => {
                if(e[0] === undefined || e === [])
                    return null;
                
                return <Event key={e[0].eventNum} event={e} />
            }) }
        </div>
    );
}

export default MREvents;