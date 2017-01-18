import React from 'react';
import U from './utils';
import EventSwim from './EventSwim';

const Event = (props) => {
    const event = props.event;

    // Order swimmers by place
    let swimmersInOrder = event.sort( (a,b) => {
        //if(a.finalsTime === '') return false;
        // const af = a.finalsTime.slice(0,-1);
        // const bf = b.finalsTime.slice(0,-1);

        let diff = U.timeDiff(b.finalsTime, a.finalsTime);


        // If a finals time exists, use that.
        // if one finals and one prelim, use finals.
        // if two prelim, compare prelims

        // Something's up with the times. One probably does not exist.
        if(diff === '') {

            // If DQ at all, send them to the end
            if(a.finalsTime.includes('DQ') || a.prelimTime.includes('DQ') )
                return 1;
            if(b.finalsTime.includes('DQ') || b.prelimTime.includes('DQ') )
                return -1;

            //  I consider a finals time of NS (no swim) to be on top of the prelims times
            let hasFinalTimeA = a.finalsTime.includes('NS');
            let hasFinalTimeB = a.finalsTime.includes('NS');
            if(hasFinalTimeA && !hasFinalTimeB)
                return 1;
            if(hasFinalTimeB && !hasFinalTimeA)
                return -1;

            // Since we don't have finals times, must try to compare prelim times
            let prelimA = false;
            let prelimB = false;
            if(a.finalsTime === '' || a.finalsTime === 'Y' || a.finalsTime.includes('NS')) 
                prelimA = true;
            if(b.finalsTime === '' || b.finalsTime === 'Y' || b.finalsTime.includes('NS'))
                prelimB = true;

            // If both are prelim times, compare them
            if(prelimA && prelimB) {
                
                diff = U.timeDiff(b.prelimTime, a.prelimTime);

                if(a.prelimTime === '' || a.prelimTime === 'Y' || a.prelimTime.includes('NS') ) 
                    diff = 1;
                if(b.prelimTime === '' || b.prelimTime === 'Y' || b.prelimTime.includes('NS'))
                    diff = -1;

                if(diff === '')
                    return 1;
            }
            else
                return prelimA ? 1 : -1;
        }
            
        return diff;
    });

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
            
                {swimmersInOrder.map( swimmer => {
                    return <EventSwim key={U.guid()} swimmer={swimmer} />
                })}
            
            </table>
        </div>
    );
}

export default Event;