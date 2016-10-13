import React, {Component} from 'react';

class CreateWorkoutSwim extends Component {

  constructor(props) {
      super(props);

      this.state = {
          distance: props.swim.distance,
          title: props.swim.title,
          desc: props.swim.desc,
          interval: props.swim.interval
      };

      this.handleOnChange = this.handleOnChange.bind(this);
    }

    // When we add a new swim line, we need to make sure MDL works
    /*global componentHandler */ // To bypass eslint warning. componentHandler exists in MDL.js
    componentDidMount() {
        if(typeof componentHandler !== 'undefined')
            componentHandler.upgradeDom();
    }

    // Send all changes back to CreateWorkoutSet
    handleOnChange(event) {
        this.setState({ [event.target.id]: event.target.value});
        this.props.handler(event.target.id, event.target.value, this.props.swimId);        
    }

    render() {
        return (
            <div className="mdl-grid mdl-grid--no-spacing create-swim">

                <div className="mdl-cell mdl-cell--1-col">
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" value={this.state.distance} onChange={this.handleOnChange}  type="text" id="distance" required />
                        <label className="mdl-textfield__label" htmlFor="distance">Distance</label>
                    </div>
                </div>

                <div className="mdl-cell mdl-cell--3-col">
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" value={this.state.title} onChange={this.handleOnChange} type="text" id="title" required />
                        <label className="mdl-textfield__label" htmlFor="title">Swim Title / Stroke</label>
                    </div>
                </div>     

                <div className="mdl-cell mdl-cell--3-col">
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" value={this.state.desc} onChange={this.handleOnChange} type="text" id="desc"  />
                        <label className="mdl-textfield__label" htmlFor="desc">Notes for swim</label>
                    </div>
                </div>

                <div className="mdl-cell mdl-cell--2-col">
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" value={this.state.interval} onChange={this.handleOnChange} type="text" id="interval"  />
                        <label className="mdl-textfield__label" htmlFor="interval">Interval / Rest</label>
                    </div>
                </div>     
            </div>  
        )
    }
}

export default CreateWorkoutSwim;