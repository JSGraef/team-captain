import React from 'react';
import U from './utils';
import Splits from './Splits';
import {Link} from 'react-router';

const EventSwim = (props) => {
    const swim = props.swimmer;

    const finalsTime = swim.finalsTime.substring(0,swim.finalsTime.length-1);
    let timeDiff = U.timeDiff(swim.seedTime, swim.finalsTime);
    let timeDiffClass = 'swim-diffNeg';
    if(timeDiff > 0) {
        timeDiff = '+'+timeDiff;
        timeDiffClass = 'swim-diffPos';
    }

    return (
        <tbody>
        <tr>
            <td className="swim-eventTitle mdl-data-table__cell--non-numeric"><Link to={`/meetreader/swimmer/${swim.ussNum}`}>{swim.swimmerName}</Link></td>
            <td>{swim.seedTime}</td>
            <td>{swim.prelimTime}</td>
            <td className="swim-finalTime">{finalsTime}</td>
            <td className={timeDiffClass}>{timeDiff}</td>
            <td>{swim.pointsScored}</td>
        </tr>
        <tr>
            <td colSpan='2' className="swim-splitTitle">SPLITS:</td>
            <Splits splits={swim.splits} />
        </tr>
        </tbody>
    )}

export default EventSwim;