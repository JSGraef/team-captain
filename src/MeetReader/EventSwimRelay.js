import React from 'react';
import U from './utils';
//import Splits from './Splits';
//import {Link} from 'react-router';

// props.relay comes in as an array of relay teams
const EventSwimRelay = (props) => {
    if(props.relay === undefined)
        return <h4>Couldn't find relay</h4>

    const relay = props.relay;
    let timeDiff = U.timeDiff(relay.seedTime, relay.finalsTime);
    let timeDiffClass = 'swim-diffNeg';
    if(timeDiff > 0) {
        timeDiff = '+'+timeDiff;
        timeDiffClass = 'swim-diffPos';
    }

    return (
        <tbody>
        <tr>
            <td>{props.place}</td>
            <td className="swim-eventTitle mdl-data-table__cell--non-numeric">{relay.teamCode} {relay.relTeamName}</td>
            <td>{relay.seedTime}</td>
            <td>{relay.prelimTime}</td>
            <td className="swim-finalTime">{relay.finalsTime}</td>
            <td className={timeDiffClass}>{timeDiff}</td>
            <td>{relay.pointsScored}</td>
        </tr>

        </tbody>
    )}

export default EventSwimRelay;