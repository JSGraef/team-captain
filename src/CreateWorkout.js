import React, { Component } from 'react';

import CreateWorkoutSet from './CreateWorkoutSet';
import CreateWorkoutInfo from './CreateWorkoutInfo';

class CreateWorkout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            setorder: props.workout.setorder,
            sets: props.workout.sets,
            info: props.workout.info
        }

        this.addSet = this.addSet.bind(this);
        this.duplicateSet = this.duplicateSet.bind(this);
        this.removeSet = this.removeSet.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleWorkoutInfoInputChange = this.handleWorkoutInfoInputChange.bind(this);
        this.findTotalDistance = this.findTotalDistance.bind(this);
        this.isInfoComplete = this.isInfoComplete.bind(this);
    }

    getUniqueID() {
        return Math.random().toString(36).substr(2, 9);
    }

    //------------------------------------------------------------------------------------------------------------
    // Set operations handers
    
    addSet(setId) {
        
        if(setId === null || setId === undefined)
            setId = `set-${this.getUniqueID()}`;
        
        var availablesets = this.state.setorder;
        var index = availablesets.indexOf(setId);

        // Since splice adds before the index and we want after, we much increment
        index++;

        var newSetId = `set-${this.getUniqueID()}`;

        // If it's the first set, just append it, otherwise insert at desired location
        if(index <= 0)
            this.setState({ setorder: this.state.setorder.concat([newSetId]) });
        else {
            availablesets.splice(index, 0, newSetId);
            this.setState({ setorder: availablesets });
        }

        if(Object.keys(this.state.sets).length <= 0) {
            var emptySet = {                
                reps: 1,
                swims: {},
                title: 'New Set',
                distance: ''
            }
            
            var allsets = this.state.sets;
            allsets[newSetId] = emptySet;
            this.setState({sets: allsets});
        }
    }

    removeSet(setId) {
        var availablesets = this.state.setorder;
        var index = availablesets.indexOf(setId);

        availablesets.remove(index);
        
        this.setState({setorder: availablesets});

        var allsets = this.state.sets;
        delete allsets[setId];  
        this.setState({sets: allsets});
    }

    duplicateSet(setId) {
        var availablesets = this.state.setorder;
        var index = availablesets.indexOf(setId);

        // Since splice adds before the index and we want after, we much increment
        index++;

        var uniqueId = `set-${this.getUniqueID()}`;
        var allsets = this.state.sets;

        allsets[uniqueId] = JSON.parse(JSON.stringify(allsets[setId]));

        // Add to list of sets
        this.setState({sets: allsets});

        // Need to maintain set order now
        // If it's the first set, just append it, otherwise insert at desired location
        if(index <= 0)
            this.setState({ setorder: this.state.setorder.concat([uniqueId]) });
        else {
            availablesets.splice(index, 0, uniqueId);
            this.setState({ setorder: availablesets });
        }
    }

    // Add up all distances from each set
    findTotalDistance() {
        var sets = Object.keys(this.state.sets);
        var distance = 0;
        sets.map(setId => {
            var d = parseInt(this.state.sets[setId].distance, 10);
            if(!isNaN(d))
                distance += d;
            return distance;
        });

        return distance;
    }

    isInfoComplete() {
        var info = this.state.info;
        if(
            info.title === '' ||
            info.coach === '' ||
            info.type === '') {
                return false;
            }
            
        return true;
    }

    saveWorkout() {
        var errorMessage = '';

        if(!this.isInfoComplete())
            errorMessage = "Workout info incomplete ";

        // find total distance and add to info
        var info = this.state.info;
        info.distance = this.findTotalDistance();

        if(info.distance <= 0) 
            errorMessage = "Not all set distances are complete ";

        if( Object.keys(this.state.sets).length === 0)
            errorMessage = "Must have at least one set ";
        
        var workout = {
                info: info,
                sets: this.state.sets,
                setorder: this.state.setorder
            };
       this.props.saveWorkout(workout, errorMessage);       
    }

    handleInputChange(swimstate, whichset) {
        var allsets = this.state.sets;
        
        var thisset = {
            swims: swimstate.swims,
            title: swimstate.title,
            reps: swimstate.reps,
            distance: swimstate.distance
        };

        allsets[whichset] = thisset;
        this.setState({sets: allsets});
    }

    handleWorkoutInfoInputChange(what, value) {
        var info = this.state.info;
        info[what] = value;
        this.setState({info: info});
    }

    getCurrentState(setId) {
        var allsets = this.state.sets;
        if(typeof allsets[setId] === 'undefined') {
            return {
                swims: {},
                title: 'New Set',
                reps: 1,
                distance: 0
            }
        }
        return allsets[setId];
    }

    render() {
        return (       
            <div>
                <header className="mdl-layout__header mdl-layout__header--scroll blackheader">
                    <div className="mdl-layout--large-screen-only mdl-layout__header-row">
                        <h4>{this.props.edit ? 'Edit workout' : 'Create a workout'}</h4>
                    </div>
                </header>

                <main className="mdl-layout__contentxs">
                    <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--2-col mdl-cell--4-col-phone mdl-cell--2-col-tablet">
                            <button className="mdl-button mdl-button--accent mdl-button--raised " onClick={ () => this.saveWorkout() }>Save Workout</button>
                            <CreateWorkoutInfo info={this.state.info} handler={this.handleWorkoutInfoInputChange} />
                        </div>
                        
                        <div className="mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet">
                            {
                                (this.state.setorder.length === 0) ?
                                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" onClick={ () => this.addSet(null) }>Add a set</button> :
                                this.state.setorder.map(setId => 
                                    <CreateWorkoutSet 
                                        currentState={this.getCurrentState(setId)}
                                        addSet={this.addSet} 
                                        duplicateSet={this.duplicateSet} 
                                        removeSet={this.removeSet}
                                        setHandler={this.handleInputChange} 
                                        setId={setId} 
                                        key={setId} 
                                    />)}
                        </div>
                    </div>
                </main>
            </div>            
        );
    }
}

export default CreateWorkout;

// CreateWorkout.propTypes = {
//         workout: React.propTypes.Object.isRequired,
//         saveWorkout: React.propTypes.func.isRequired,
//         getUniqueID: React.propTypes.func.isRequired,
//         edit: React.propTypes.bool
//     }

/* eslint-disable */
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
/* eslint-enable */