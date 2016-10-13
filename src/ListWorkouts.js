import React, { Component } from 'react';

import ListWorkoutsFilter from './ListWorkoutsFilter'; 
import ListWorkoutsList from './ListWorkoutsList'; 
//import FeaturedWorkout from './FeaturedWorkout'; 

class ListWorkouts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: 'all',
            filteredWorkouts: props.workouts
        }

        this.filterHandler = this.filterHandler.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(Object.keys(this.state.filteredWorkouts).length === 0) 
            this.setState({filteredWorkouts: nextProps.workouts});
    }

    filterHandler(selected) {
        this.setState({selected: selected});

        // Get workouts associated with new type
        var wo = Object.keys(this.props.workouts);
        var filtered = {};
        
        
        wo.forEach((key) => {
            var tags = this.props.workouts[key].info.type.split(', ');

            if(selected==='all' || tags.indexOf(selected) >= 0)
                filtered[key] = this.props.workouts[key];
        })

        // Update state for FilteredWorkouts to send to list
        this.setState({filteredWorkouts: filtered});
    }
    
    render() {
        if(this.props.workouts === undefined)
            return <p>No workouts yet! How about you create one?</p>

        var wo = Object.keys(this.props.workouts);

        var tags = ['all'];
        wo.forEach((key) => {
            var split = this.props.workouts[key].info.type.split(',');
            if(split.length > 1) 
                for(var i=0; i< split.length; i++)
                    tags.push(split[i].trim());
            else
                tags.push(split[0].trim());
        });

        // Get unique set of workout types (no duplicates)
        var taglist = Array.from(new Set(tags));

        //var randIdx = Math.floor(Math.random() * wo.length);

        return (
            <div>
                <header className="mdl-layout__header mdl-layout__header--scroll blackheader">
                    <div className="mdl-layout--large-screen-only mdl-layout__header-row">
                        <h4>Workouts</h4>
                    </div>
                </header>
                
                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--12-col">
                        <ListWorkoutsFilter tags={taglist} selected={this.state.selected} filterHandler={this.filterHandler} />
                        <ListWorkoutsList workouts={this.state.filteredWorkouts} />
                    </div>

                </div>
            </div>
        )
    }
}

export default ListWorkouts;



// <div className="mdl-cell mdl-cell--1-col mdl-cell--8-col-tablet"></div>
// <div className="mdl-cell mdl-cell--2-col mdl-cell--8-col-tablet">
//     { /* <FeaturedWorkout workout={this.props.workouts[wo[randIdx]]} workoutId={wo[randIdx]} /> */ }  
//     <ListWorkoutsFilter tags={taglist} selected={this.state.selected} filterHandler={this.filterHandler} />
// </div>
