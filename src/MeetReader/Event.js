import React from 'react';
import U from './utils';
import EventSwim from './EventSwim';

const Event = (props) => {
    const event = props.event;

    return (
        <div className="mdl-cell mdl-cell--12-col swimmer">
            <div className="swimmer-header">
                <h4>{U.parseEventTitle(event[0])}</h4>
            </div>
            
            <table className="mdl-data-table" width="100%">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Seed Time</th>
                    <th>Prelim Time</th>
                    <th>Finals Time</th>
                    <th>Time Adjustment</th>
                    <th>Points Scored</th>
                </tr>
            </thead>
            
                {event.map( swimmer => {
                    return <EventSwim key={U.guid()} swimmer={swimmer} />
                })}
            
            </table>
        </div>
    );
}

export default Event;