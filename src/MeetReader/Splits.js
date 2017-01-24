import React from 'react';
import U from './utils';

// Gets the splits of a swim.
// TODO this is very basic and there's a lot of work to be done here
const Splits = (props) => {
    const s = props.splits;

    let splits = [];
    splits.push( s.splitTime1 );
    splits.push( s.splitTime2 );
    splits.push( s.splitTime3 );
    splits.push( s.splitTime4 );
    splits.push( s.splitTime5 );
    splits.push( s.splitTime6 );
    splits.push( s.splitTime7 );
    splits.push( s.splitTime8 );
    splits.push( s.splitTime9 );
    splits.push( s.splitTime10 );


    return (
        <td colSpan="4" className="swim-splitTd">
            { splits.map( split => {
                return <span key={U.guid()} className='swim-split'>{split}</span>
            })}
        </td>
            
    )}

export default Splits;