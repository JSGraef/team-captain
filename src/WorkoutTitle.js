import React from 'react';

import SetDivider from './SetDivider';

const WorkoutTitle = (props) => {

  return (
    <div>

      { (props.print === true) ? <SetDivider thick={true} /> : <span></span>}

      <div className="mdl-grid uppercase">
        <div className="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet">
          <p className="workout-title">{props.info.title}</p>
        </div>
        <div className="mdl-cell mdl-cell--middle mdl-cell--3-col mdl-cell--4-col-phone leftborder">
          <p className="workout-type">COACH: {props.info.coach}</p>
        </div>
        <div className="mdl-cell mdl-cell--middle mdl-cell--2-col leftborder">
          <p className="workout-type">{props.info.type}</p>
        </div>
        <div className="mdl-cell mdl-cell--middle mdl-cell--2-col leftborder">
          <p className="workout-type">Distance: {props.info.distance}</p>
        </div>
      </div>

      <SetDivider thick={true} />

    </div>
  )
}

export default WorkoutTitle;
