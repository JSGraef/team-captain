import React, { Component } from 'react';

// Firebase
import {config} from './config/config';
import Rebase  from 're-base';
var base = Rebase.createClass(config);

import { Link } from 'react-router';

import WorkoutNotes from './WorkoutNotes';
import WorkoutTitle from './WorkoutTitle';
import WorkoutSet from './WorkoutSet';
import SetDivider from './SetDivider';

class Workout extends Component {

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
            return <p>Not Found</p>

        var wid = this.props.routeParams ? this.props.routeParams.workoutid : 0; // for testing purposes. There must be a better way.
        var printpath = '/print/' + wid;
        return (
            <div>
                <Link to={printpath} target="_blank" className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-cell--hide-phone fab-print">
                    <i className="material-icons">print</i>
                </Link>

                <WorkoutTitle info={this.state.workout.info} print={false} />

                { this.state.workout.setorder.map((setId) => {
                    return <WorkoutSet key={setId} set={this.state.workout.sets[setId]} />
                })}  
                              
                <SetDivider thick={true} />
                <WorkoutNotes notes={this.state.workout.info.notes} />

            </div>
        );
    }
}

export default Workout;