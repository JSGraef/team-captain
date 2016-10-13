import React, { Component } from 'react';

// Firebase
import Rebase  from 're-base';
var base = Rebase.createClass('https://teamcaptain-b3334.firebaseio.com/');

import CreateWorkout from './CreateWorkout';
import { Notification } from 'react-notification';
import { browserHistory } from 'react-router';

class Edit extends Component {

    constructor(props) {
        super(props);

        var emptyWorkout = {
                    setorder: [],
                    sets: {},
                    info: {}
                }  
        var notif = {
                show: false,
                message: '',
                action: ''
            }
        
        this.state = (props.workout === undefined) ? 
            {workout: emptyWorkout, notification: notif} : 
            {workout: props.workout, notification: notif};

        this.saveWorkout = this.saveWorkout.bind(this)
        this.viewWorkoutHandler = this.viewWorkoutHandler.bind(this);
    }

    componentDidMount() {
        var path = 'workouts/'+this.props.routeParams.workoutId;

        base.fetch(path, {
            context : this,
            then(data) {
                this.setState({workout: data})
        }});
    }

    saveWorkout(workout, errorMessage='') {

        if(errorMessage !== '') {
            this.setState({notification: {
                show: true,
                message: "Couldn't Save: " + errorMessage,
                action: ''
            }});

            return;
        }

        try {
            // TODO: Save to localstorage as well?

            base.post(`workouts/${this.props.routeParams.workoutId}`, {
                data: {
                    updated: Date.now(),
                    info: workout.info,
                    sets: workout.sets,
                    setorder: workout.setorder
                }
            });

            this.setState({notification: {
                show: true,
                message: "Workout Saved!",
                action: 'View'
            }});

        } catch(error) {
            //console.log(error);
            this.setState({notification: {
                show: true,
                message: "Couldn't save. Not all required (red) fields are filled out.",
                action: ''
            }});
        }
    }

    viewWorkoutHandler() {
        browserHistory.push(`/workouts/${this.props.routeParams.workoutId}`);
    }

    render() {
        if(this.state.workout.setorder.length === 0)
            return <div className="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>

        var defaultNotification = {show: false, message: this.state.notification.message, action: this.state.notification.action};
        return (  
            <div>     
                <CreateWorkout 
                    workout={this.state.workout} 
                    saveWorkout={this.saveWorkout} 
                    getUniqueID={this.getUniqueID} 
                    edit={true} 
                />     

                <Notification 
                    isActive={this.state.notification.show}
                    title={this.state.workout.info.title}
                    message={this.state.notification.message}
                    action={this.state.notification.action}
                    dismissAfter={5000}
                    onDismiss={() => { this.setState({notification: defaultNotification}) } }
                    onClick={this.viewWorkoutHandler}
                />  
            </div>     
        );
    }
}

export default Edit;