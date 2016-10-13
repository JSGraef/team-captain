import React, {Component} from 'react';

class CreateWorkoutInfo extends Component {

  constructor(props) {
      super(props);

      this.state = {
          title: props.info.title,
          coach: props.info.coach,
          notes: props.info.notes,
          type: props.info.type
      };

      this.handleOnChange = this.handleOnChange.bind(this);
    }

    // Send all changes back to CreateWorkout
    handleOnChange(event) {
        var value = event.target.value;
        if(event.target.id === 'type')
            value = value.toLowerCase();
        this.setState({ [event.target.id]: value });
        this.props.handler( event.target.id, value );        
    }

    render() {
        return (
                <div>
                    <h4>Workout Info:</h4>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" value={this.state.title} onChange={this.handleOnChange}  type="text" id="title" required />
                        <label className="mdl-textfield__label" htmlFor="title">Workout Title</label>
                    </div>

                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" value={this.state.coach} onChange={this.handleOnChange} type="text" id="coach" required />
                        <label className="mdl-textfield__label" htmlFor="coach">Coach's Name</label>
                    </div>   

                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" value={this.state.type} onChange={this.handleOnChange} type="text" id="type" required />
                        <label className="mdl-textfield__label" htmlFor="type">Workout Tags</label>
                    </div> 

                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <textarea className="mdl-textfield__input" rows="10" value={this.state.notes} onChange={this.handleOnChange} type="text" id="notes" required />
                        <label className="mdl-textfield__label" htmlFor="notes">Workout Notes</label>
                    </div>                  
                </div>
        )
    }
}

export default CreateWorkoutInfo;