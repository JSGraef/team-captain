import React, { Component } from 'react';
import Swimmer from './Swimmer';

class MRSwimmer extends Component {

    render() {
        const teams = this.props.teams;
        let swimmer = {};
        const swimmerid = this.props.routeParams.swimmerid.slice(0,-2);

        for(let t of teams) {
            if( swimmerid in t.swimmers) {
                swimmer = t.swimmers[swimmerid];
                break;
            }
        }

        if(teams.length === 0 || swimmer === {})
            return <h4>Couldn't find that swimmer</h4>

        return <Swimmer key={swimmer.ussNum} swimmer={swimmer} />
    }
}

export default MRSwimmer;