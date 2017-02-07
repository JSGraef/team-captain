import React, { Component } from 'react';

// Firebase
import {config} from './config/config';
import Rebase  from 're-base';
var base = Rebase.createClass(config);

import CreateWorkout from './CreateWorkout';
import { Notification } from 'react-notification';
import { browserHistory } from 'react-router';

class Create extends Component {

    constructor() {
        super();

        var defaultSets = {
            'set-warmup': {
                reps: 1,
                swims: {},
                title: 'Warmup',
                distance: ''
            },
            'set-mainset': {
                reps: 1,
                swims: {},
                title: 'Main Set',
                distance: ''
            },
            'set-cooldown': {
                reps: 1,
                swims: {},
                title: 'Cool Down',
                distance: ''
            }
        }

        this.state = {
            workout: {
                workoutId: this.getUniqueID(),
                setorder: ['set-warmup', 'set-mainset', 'set-cooldown'],
                sets: defaultSets,
                info: {
                    title: '',
                    coach: '',
                    type: '',
                    notes: '',
                    distance: ''
                }
            },
            notification: {
                show: false,
                message: '',
                action: ''
            }
        }

        this.saveWorkout = this.saveWorkout.bind(this);
        this.viewWorkoutHandler = this.viewWorkoutHandler.bind(this);
    }

    getUniqueID() {
        return 'workout_' + Math.random().toString(36).substr(2, 9);
    }

    viewWorkoutHandler() {
        browserHistory.push(`/workouts/${this.state.workout.workoutId}`);
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

            base.post(`workouts/${this.state.workout.workoutId}`, {
                data: {
                    created: Date.now(),
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

    render() {
        var defaultNotification = {show: false, message: this.state.notification.message, action: this.state.notification.action};
        return (       
            <div>
                <CreateWorkout 
                    workout={this.state.workout} 
                    saveWorkout={this.saveWorkout} 
                    getUniqueID={this.getUniqueID}
                    edit={false} />   
            
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

export default Create;