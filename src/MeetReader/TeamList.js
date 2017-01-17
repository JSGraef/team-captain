import React from 'react';
import {Link} from 'react-router';

const TeamList = (props) => {
    //const swimmerKeys = Object.keys(props.team.swimmers);
    return (            
    <div key={props.team.teamCode}>
        <Link to={`/meetreader/team/${props.team.teamCode}`}>{props.team.teamCode}</Link>
    </div>
    );
}

export default TeamList;