import React, { Component } from 'react';

import Swim from './Swim';
import SetDivider from './SetDivider';

class WorkoutSet extends Component {

    constructor() {
        super();
        this.renderSwim = this.renderSwim.bind(this);
        this.renderWithReps = this.renderWithReps.bind(this);
        this.renderSansReps = this.renderSansReps.bind(this);
    }

    renderSwim(key) {
        return (
            <Swim key={key} swim={this.props.set.swims[key]} />
        );
    }

    renderWithReps(swims) {
        return (
            <div>

                <div className="mdl-grid mdl-grid--no-spacing set">
                    
                    <div className="mdl-cell mdl-cell--stretch mdl-cell--2-col mdl-cell--1-col-tablet mdl-cell--4-col-phone gutter uppercase">
                        {this.props.set.title}<br/>
                        {this.props.set.distance}
                    </div>

                    <div className="mdl-cell mdl-cell--1-col mdl-cell--middle">
                        <p className="numbertext">{this.props.set.reps}x</p>
                    </div>

                    <div className="mdl-cell mdl-cell--9-col mdl-cell--6-col-tablet mdl-cell--3-col-phone">
                        <div className="leftnumberborder">                  
                            { swims.map(this.renderSwim) }
                        </div>  
                    </div>

                </div>
                <SetDivider /> 

            </div>
        );
    }

    renderSansReps(swims) {
        return (
            <div>

                <div className="mdl-grid mdl-grid--no-spacing set">
                    
                    <div className="mdl-cell mdl-cell--stretch mdl-cell--2-col mdl-cell--1-col-tablet mdl-cell--4-col-phone gutter uppercase">
                        {this.props.set.title}<br/>
                        {this.props.set.distance}
                    </div>

                    <div className="mdl-cell mdl-cell--1-col mdl-cell--middle">
                        <p className="numbertext"></p>
                    </div>

                    <div className="mdl-cell mdl-cell--9-col mdl-cell--6-col-tablet">                    
                        { swims.map(this.renderSwim) }
                    </div>     

                </div>
                <SetDivider /> 

            </div>
        );
    }

    render() {
        var swims = Object.keys(this.props.set.swims);

        if(this.props.set.reps > 1)
            return this.renderWithReps(swims);
        else
            return this.renderSansReps(swims);
    }
}

export default WorkoutSet;