import React from 'react';

const Swim = (props) => {

  return (
    <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--2-col number mdl-cell--hide-phone">
            <p className="numbertext">{props.swim.distance}</p>
        </div>
        
        <div className="mdl-cell mdl-cell--2-col-phone number mdl-cell--hide-desktop mdl-cell--hide-tablet">
            <p className="numbertext-phone">{props.swim.distance}</p>
        </div>

        <div className="mdl-cell mdl-cell--5-col mdl-cell--4-col-tablet mdl-cell--order-3-phone">
            <p className="settitle">{props.swim.title}</p>
            <p className="setdesc">{props.swim.desc}</p>
        </div>

        <div className="mdl-cell mdl-cell--2-col mdl-cell--order-2-phone rest">
            {props.swim.interval}
        </div>
    </div>
  )
}

export default Swim;