import React from 'react';
import {Link} from 'react-router';

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