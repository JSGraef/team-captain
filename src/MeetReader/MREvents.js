import React, { Component } from 'react';
import U from './utils';
import Event from './Event';

class MREvents extends Component {

    renderEvent(event) {
        if(event[0] === undefined || event === [])
            return;
        
        return <Event key={event[0].eventNum} event={event} />
    }

    render() {
        const teams = this.props.teams;
        let events = [[]];

        // for each event, go through teams -> swimmers and pull out who swam what.
        // A number of ways to make this faster:
        // -- Check event age and compare to swimmer age

        for(let eventNum of this.props.events) {
            events[eventNum] = [];
            for(let team of teams) {

                for(let s in team.swimmers) {
                    let swimmer = team.swimmers[s];

                    for(let swim of swimmer.swims) {
                        if(swim.eventNum === eventNum) 
                            events[eventNum].push(swim);
                    }
                }
            }

            if(teams.length === 0 )
                return <h4>Couldn't find that team</h4>
        }

        return (
            <div>
                { events.map( e => {return this.renderEvent(e)}) }
            </div>
        );
    }
}

export default MREvents;