import React, {Component} from 'react';

class PaceCalculator extends Component {

  constructor(props) {
      super(props);

      this.state = {
          distance: '1000',
          time: '15:00',
          pace: '',
          splits: []
      };

      this.handleOnChange = this.handleOnChange.bind(this);
      this.findPace = this.findPace.bind(this);
      this.getSplits = this.getSplits.bind(this);
    }

    // This upgrades all upgradable components (i.e. with 'mdl-js-*' class)
    /*global componentHandler */ 
    componentDidMount() {
        if(typeof componentHandler !== 'undefined')
            componentHandler.upgradeDom();

        this.findPace();
    }

    // Send all changes back to CreateWorkout
    handleOnChange(event) {
        let {value, id} = event.target;
        if(id === 'time' || id === 'pace') {
            // Only allow colons and numbers
            let i = value.length;
            while(i--){
                if( !this.isNumber(value[i]) && value[i] !== ':')
                    return;
            }
        }

        this.setState({ [event.target.id]: value });              
    }

    getTimeInSeconds(time) {
        const parts = time.split(':').map(part => parseFloat(part)).reverse();
        const totalSecs = parts
            .map( (t, index) => t * Math.pow(60,index))
            .reduce( (tot,num) => tot+num, 0);

        return totalSecs;
    }

    convertToTimeString(sec_num) {
        let hours   = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}

        if(hours === 0 || hours === '00')
            return `${minutes}:${seconds}`;

        return `${hours}:${minutes}:${seconds}`;
    }

    findPace() {
        // convert time and pace to seconds
        const { time, distance } = this.state;
        const timeInSecs = this.getTimeInSeconds(time);

        if(timeInSecs === 0 || distance === 0) 
            return;

        const pace = timeInSecs / (distance/100);

        const nicePace = this.convertToTimeString( pace );
        this.setState({ pace: nicePace });

        this.getSplits();
    }

    isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    getSplits() {
        const {distance} = this.state;
        if(distance === 0)
            return;

        const numSplits = distance / 50;
        const totalSecs = this.getTimeInSeconds(this.state.time);
        const paceTime = Math.floor(totalSecs/numSplits);
        let splits = [];
        for(var i=1; i<=numSplits; i++) {
            const splitTime = i * paceTime;
            splits.push( this.convertToTimeString(splitTime) );
        }

        this.setState({splits: splits});
    }

    render() {
        return (
            <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--12-col">
                    <h4>Swim Pace Information:</h4>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" value={this.state.distance} onChange={this.handleOnChange}  type="number" id="distance" required />
                        <label className="mdl-textfield__label" htmlFor="distance">Distance</label>
                    </div>
                    <br/>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" value={this.state.time} onChange={this.handleOnChange} type="text" id="time" required />
                        <label className="mdl-textfield__label" htmlFor="time">Time</label>
                    </div>  <br />
                    <div>
                        <button className="mdl-button mdl-button--raised mdl-button--accent" onClick={this.findPace} >Get Pace & Splits</button>
                    </div>

                    <div>
                        <h4>Pace:</h4>
                        <h2>{this.state.pace} / 100</h2>
                        <h4>Splits:</h4>
                        <table>
                            <thead>
                                <tr>
                                    <td>Lap</td>
                                    <td>Time</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.splits.map( (split,i) => {
                                    return (<tr key={i}><td>{i+1}</td><td>{split}</td></tr>);
                                })}
                            </tbody>
                        </table>
                    </div>         
                </div>
            </div>
        )
    }
}

export default PaceCalculator;