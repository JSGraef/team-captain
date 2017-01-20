import React, { Component } from 'react';
import Swimmer from './Swimmer';

// Shows swimmer info based on URL input of swimmer's USSNum
class MRSwimmer extends Component {

    render() {
        const teams = this.props.teams;
        let swimmer = {};
        const swimmeridMod = this.props.routeParams.swimmerid.slice(0,-2);
        const swimmerid = this.props.routeParams.swimmerid;

        // Sometimes we come in with a full USSNum, othertimes the last two digits are cut off
        // For now, just look for both
        for(let t of teams) {
            if( swimmerid in t.swimmers) {
                swimmer = t.swimmers[swimmerid];
                break;
            } else if( swimmeridMod in t.swimmers) {
                swimmer = t.swimmers[swimmeridMod];
                break;
            }
        }

        if(teams.length === 0 || swimmer === {} || swimmer === undefined)
            return <h4>Couldn't find that swimmer</h4>

        return <Swimmer key={swimmer.ussNum} swimmer={swimmer} />
    }
}

export default MRSwimmer;