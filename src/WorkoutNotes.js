import React from 'react';

const WorkoutNotes = (props) => {

  return (
    <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--2-col mdl-cell--4-col-phone">
            <p className="workout-title">NOTES</p>
        </div>
        <div className="mdl-cell mdl-cell--7-col">
            <p className="workout-notes">{props.notes}</p>
        </div>
    </div>
  )
}

export default WorkoutNotes;