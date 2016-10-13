import React, { Component } from 'react';

import CreateWorkoutSwim from './CreateWorkoutSwim';

class CreateWorkoutSet extends Component {

    constructor(props) {
        super(props);

        // Populate the swim input fields if we have any. Otherwise make one at least
        var swimInputs = Object.keys(props.currentState.swims);
        
        if(swimInputs.length === 0)
            swimInputs = ['swim-0'];

        // State only serves as managed inputs
        this.state = { 
            inputs: swimInputs,
            title: props.currentState.title,
            reps: props.currentState.reps,
            swims: props.currentState.swims,
            distance: props.currentState.distance       
        }

        // This bindings
        this.handleChange = this.handleChange.bind(this);
        this.handleSwimInputChange = this.handleSwimInputChange.bind(this);
        this.getSwim = this.getSwim.bind(this);
    }

    // This upgrades all upgradable components (i.e. with 'mdl-js-*' class)
    /*global componentHandler */ // To bypass eslint warning. componentHandler exists in MDL.js
    componentDidMount() {
        if(typeof componentHandler !== 'undefined')
            componentHandler.upgradeDom();
    }

    componentWillUpdate(nextProps, nextState) {
        if(this.props === nextProps)
            this.props.setHandler(nextState, this.props.setId);
    }

    //---------------------------------------------------------------------------------------------------------------
    // Handlers

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    // Find the swim, update its contents in the state and send the changes back up to CreateWorkout
    handleSwimInputChange(what, value, whichswim) {
        var allswims = this.state.swims;
        if(allswims[whichswim] === undefined)
            allswims[whichswim] = {};

        var swim = allswims[whichswim];
        swim[what] = value;
    
        allswims[whichswim] = swim;
        this.setState({swims: allswims});

        // Pass set info up to CreateWorkout
        this.props.setHandler(this.state, this.props.setId);
    }

    //---------------------------------------------------------------------------------------------------------------
    // Helper Functions

     // Makes a new swim input line
    appendInput() {
        var lastswim = this.state.swims[`swim-${this.state.inputs.length - 1}`];
        if( typeof lastswim === 'undefined' || typeof lastswim.distance === 'undefined' || typeof lastswim.title === 'undefined' || lastswim.distance === '' || lastswim.title === '' )
            return;
        
        var newInput = `swim-${this.state.inputs.length}`;
        this.setState({ inputs: this.state.inputs.concat([newInput]) });
    }

    // Returns the swim, or an empty object if one doesn't exist
    getSwim(swimId) {
        var allswims = this.state.swims;
        if(typeof allswims[swimId] === 'undefined') {
            return {
                title: '',
                distance: '',
                desc: '',
                interval: ''
            }
        }
        return allswims[swimId];
    }

    //---------------------------------------------------------------------------------------------------------------
    // Renderers
    
    render() {
        return (       
            <section className="mdl-shadow--4dp create-set">
                
                <div className="mdl-card__title">
                    <h4 className="mdl-card__title-text">{this.state.title}</h4>
                    <div className="mdl-layout-spacer"></div>
                    <button className="mdl-button delete" onClick={ () => this.props.removeSet(this.props.setId) }><i className="material-icons icon">delete</i></button>
                </div>
                <div className="mdl-card__supporting-text">
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" value={this.state.title} onChange={this.handleChange} type="text" id="title" required />
                        <label className="mdl-textfield__label" htmlFor="title">Set Title</label>
                    </div> &nbsp;

                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" type="text" value={this.state.reps} onChange={this.handleChange} id="reps" required />
                        <label className="mdl-textfield__label" htmlFor="reps">Repetitions</label>
                    </div> &nbsp;

                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" type="number" value={this.state.distance} onChange={this.handleChange} id="distance" required />
                        <label className="mdl-textfield__label" htmlFor="distance">Total Set Distance</label>
                    </div>

                    {this.state.inputs.map(swimId => 
                        <CreateWorkoutSwim 
                            handler={this.handleSwimInputChange} 
                            swimId={swimId} 
                            key={swimId} 
                            swim={this.getSwim(swimId)}
                        />)}  

                    <button className="mdl-button" onClick={ () => this.appendInput() }>Add swim to set</button>     
                    
                </div>
                <div className="mdl-card__actions">
                    <button className="mdl-button" onClick={ () => this.props.addSet(this.props.setId) }>Add New Set After</button>
                    <button className="mdl-button" onClick={ () => this.props.duplicateSet(this.props.setId) }>Duplicate Set</button>
                     
                </div>
                
            </section>      
        );
  }
}

export default CreateWorkoutSet;