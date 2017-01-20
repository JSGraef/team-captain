import React from 'react';
import {Link} from 'react-router';

// Shows a list of all teams in the meet file by their team codes
const TeamList = (props) => {
    return (            
        <ul>
            { props.teams.map(team => {
                return (
                    <li key={team.teamCode}>
                        <Link to={`/meetreader/team/${team.teamCode}`}>{team.teamCode}</Link>
                    </li>
                )
            })}
        </ul>
    );
}

export default TeamList;