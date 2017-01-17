import React, { Component } from 'react';

import './MeetReader.css';
import Team from './Team';
import TeamList from './TeamList';
import U from './utils';

class MeetReader extends Component {
  constructor() {
    super();

    this.state = {
      lines: [],
      meet: {},
      meetInfo: {},
      teams: []
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.readFile = this.readFile.bind(this);
    this.parseFileContents = this.parseFileContents.bind(this);
    this.initialize = this.initialize.bind(this);
  }

 // If a new file is read, get rid of 100% of the old stuff
  initialize() {
    this.setState({
      lines: [],
      meet: {},
      meetInfo: {},
      teams: []
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    const file = this.refs.file.files[0];
    if(file === 'undefined') 
      return;
    
    this.initialize();

    this.readFile(file);
    this.setState({filename: file.name});
  }

  readFile(file) {
    const fr = new FileReader();
    fr.onloadend = (e)=> {
      let contents = e.target.result;
      this.setState({filetext: contents});
      let lines = contents.split(/\r\n|\r|\n/);
      this.setState({lines: lines});
    };
    fr.readAsText(file);
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.lines !== prevState.lines)
      this.parseFileContents();
  }

  parseFileContents() {
    const lines = this.state.lines;

    // Read file line by line and do something with it
    for(let line of lines) {
      let header = line.substring(0,2);

      switch(header){
        case 'A0': 
          U.parseA0(line); 
          break;
        case 'B1': {
          const meetInfo = U.parseB1(line); 
          this.setState({meetInfo: meetInfo});
          break;
        }
        case 'B2': 
          U.parseB2(line); 
          break;
        case 'C1': {
            const teamRecord = U.parseC1(line); 
            let teams = this.state.teams;
            teams.push(teamRecord);
            this.setState({teams: teams});
            break;
        }
        case 'C2': 
          U.parseC2(line); 
          break;
        case 'D0': { 
            const event = U.parseD0(line); 
            let teams = this.state.teams;
            let swimmers = teams[teams.length -1].swimmers;

            if(swimmers[event.ussNum] === undefined)
            swimmers[event.ussNum] = {swims:[]};
            
            swimmers[event.ussNum].swims.push(event);

            teams[teams.length -1].swimmers = swimmers;
            this.setState({teams: teams});

            break;
        }
        case 'D1': 
          U.parseD1(line); 
          break;
        case 'D2': 
          U.parseD2(line); 
          break;
        case 'D3': {
            const swimmer = U.parseD3(line); 
            let teams = this.state.teams;
            let swimmers = teams[teams.length -1].swimmers;
            let modUssNum = swimmer.ussNum.substring(12,0);
            let currentSwims = swimmers[modUssNum].swims;

            // Combine new with old
            swimmers[modUssNum] = swimmer;
            swimmers[modUssNum].swims = currentSwims;

            // Update team with swimmer
            teams[teams.length -1].swimmers = swimmers;
            this.setState({teams: teams});
            
            break;
        }
        case 'E0': 
          U.parseE0(line); 
          break;
        case 'F0': 
          U.parseF0(line); 
          break;
        case 'G0': {
            const splitRec = U.parseG0(line); 
            let teams = this.state.teams;
            let swimmer = teams[teams.length -1].swimmers[splitRec.ussNum];

            // Swimmer was never entered in, just skip it for now
            // TODO - need to handle this
            if(swimmer === undefined) 
                return;
            
            swimmer.swims[ swimmer.swims.length -1 ].splits.push(splitRec);

            // Update team with swimmer
            teams[teams.length -1].swimmers[splitRec.ussNum] = swimmer;
            this.setState({teams: teams});
            
            break;
        }
        case 'J0': 
          U.parseJ0(line); 
          break;
        case 'J1': 
          U.parseJ1(line); 
          break;
        case 'J2': 
          U.parseJ2(line); 
          break;
        case 'Z0': 
          U.parseJ0(line); 
          break;
        default: break;
      }
    }
  }

  render() {

      const childrenWithProps = React.Children.map(this.props.children,
        (child) => React.cloneElement(child, {
          workouts: this.state.workouts
        })
      );
    
    return (
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col">
              <form onSubmit={this.onFormSubmit}>
                <input type="file" ref="file" name="file" id="file"/>
                <button type="submit">Submit</button>
              </form>
              <hr/>
          </div>
          <div className="mdl-cell mdl-cell--2-col">
            <div className="sidenav">
              <h6>TEAMS</h6>
              { this.state.teams.map(team => 
                  {return <TeamList key={team.teamCode} team={team} />}
              )}
              <hr />
            </div>
          </div>
          <div className="mdl-cell mdl-cell--10-col">
            <h1>{this.state.meetInfo.meetName}</h1>
              { this.state.teams.map(team => 
                {return <Team key={team.teamCode} team={team} />}
              )}
          </div>
        </div>
    );
  }
}

export default MeetReader;
