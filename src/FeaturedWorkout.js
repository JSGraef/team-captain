import React from 'react';

import { Link } from 'react-router';

const FeaturedWorkout = ({workout, workoutId}) => {
    if(workout === undefined)
        return <p>Workout no longer available :(</p>

    var view = 'workouts/' + workoutId;
    
    return (
        <section className="mdl-shadow--4dp create-set">
        
            <div className="mdl-card__title">
                <h4 className="mdl-card__title-text">FEATURED WORKOUT</h4>
            </div>
            <div className="mdl-card__supporting-text">
                
                <h5>{workout.info.title}</h5>
                <p>{workout.info.notes}</p>
            </div>
            <div className="mdl-card__actions">
                <Link className="mdl-button" to={view}>View Workout</Link>
                
                
            </div>
            
        </section>      
    )
}

export default FeaturedWorkout;



