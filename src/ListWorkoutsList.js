import React from 'react';

import { Link } from 'react-router';

const ListWorkoutsList = ({workouts}) => {
    if(workouts === undefined)
        return <p>No workouts yet! How about you create one?</p>

    var wo = Object.keys(workouts);
    
    return (
        <div>

            { wo.map((key) => {
                var w = workouts[key];
                var tags = w.info.type.split(',');

                return (
                    <div key={key} className="wo-tile">
                        <div className="mdl-grid mdl-grid--no-spacing"> 
                            <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--3-col-phone">  
                                <span className="wo-title">
                                    <Link to={`/workouts/${key}`}>{w.info.title}</Link>
                                </span>
                            </div>

                            <div className="mdl-cell mdl-cell--2-col mdl-cell--1-col-phone wo-distance">  
                                <span>{w.info.distance}m</span>
                            </div>
                        </div>

                        <div className="mdl-grid mdl-grid--no-spacing wo-coach"> 
                            <div className="mdl-cell mdl-cell--12-col">  
                                <span className="">Coach: {w.info.coach}</span>
                            </div>
                        </div>

                        <div className="mdl-grid mdl-grid--no-spacing">
                            <div className="mdl-cell mdl-cell--12-col wo-notes">  
                                {w.info.notes}
                            </div>
                        </div>

                        <div className="mdl-grid mdl-grid--no-spacing"> 
                            <div className="mdl-cell mdl-cell--12-col">  
                                { tags.map((key) => {
                                    return (
                                        <span className="wo-tags" key={key}>
                                            {key.trim()}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                        
                    </div>
                );
            })}
        </div>

    )
}

export default ListWorkoutsList;