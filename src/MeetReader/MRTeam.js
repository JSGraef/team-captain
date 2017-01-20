import React, { Component } from 'react';
import Team from './Team';

// Shows <Team> of URL Team ID
class MRTeam extends Component {

    render() {
        const teams = this.props.teams;
        let team = {};

        for(let t of teams) {
            if(t.teamCode === this.props.routeParams.teamid) {
                team = t;
                break;
            }
        }
        if(teams.length === 0 || team === {})
            return <h4>Couldn't find that team</h4>

        return <Team key={team.teamCode} team={team} />
    }
}

export default MRTeam;