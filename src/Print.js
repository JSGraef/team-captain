import React, { Component } from 'react';

// Firebase
import {config} from './config/config';
import Rebase  from 're-base';
var base = Rebase.createClass(config);

import WorkoutNotes from './WorkoutNotes';
import WorkoutTitle from './WorkoutTitle';
import WorkoutSet from './WorkoutSet';
import SetDivider from './SetDivider';

class Print extends Component {

    constructor(props) {
        super(props);

        var emptyWorkout = {
                    setorder: [],
                    sets: {},
                    info: {}
                }    
        
        this.state = (props.workout === undefined) ? 
            {workout: emptyWorkout} : 
            {workout: props.workout};
    }

    componentDidMount() {
        var path = 'workouts/'+this.props.routeParams.workoutid;

        base.fetch(path, {
            context : this,
            then(data) {
                this.setState({workout: data})
        }});
    }

    render() {
        if(this.state.workout.setorder.length === 0)
            return <p>Looking...</p>

        return (
            <div>
                <WorkoutTitle info={this.state.workout.info} print={true} />

                { this.state.workout.setorder.map((setId) => {
                    return <WorkoutSet key={setId} set={this.state.workout.sets[setId]} />
                })}  
                              
                <SetDivider thick={true} />
                <WorkoutNotes notes={this.state.workout.info.notes} />

            </div>
        );
    }
}

export default Print;