import React, { Component } from 'react';

import './MeetReader.css';
import TeamList from './TeamList';
import MRDashboard from './MRDashboard';
import U from './utils';
import {Link} from 'react-router';

class MeetReader extends Component {
  constructor() {
    super();

    this.state = {
      lines: [],
      meetInfo: {},
      teams: [],
      events: []
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.readFile = this.readFile.bind(this);
    this.parseFileContents = this.parseFileContents.bind(this);
    this.initialize = this.initialize.bind(this);
  }

 // If a new file is read, get rid of all the old stuff
  initialize() {
    this.setState({
      lines: [],
      meetInfo: {},
      teams: []
    });
  }

  // When 'submit' is pressed, clear state and read the file
  onFormSubmit(e) {
    e.preventDefault();
    const file = this.refs.file.files[0];
    if(file === 'undefined') 
      return;
    
    this.initialize();

    const fileName = file.name;
    var ext = fileName.substr(fileName.lastIndexOf('.') + 1);
    if(ext === 'sd3' || ext === 'cl2') {
      this.readFile(file);
      this.setState({filename: file.name});
      this.props.router.push('/meetreader');
    }
    
    // TODO tell user that we just ignored a file
    
  }

  // Reads the file in individual lines and saves the state
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

  // For each line in the file, do something with the record
  // This is the heart of the app and controls everything on file read
  parseFileContents() {
    const lines = this.state.lines;
    let events = new Set();

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

            // If we don't have a record for that swimmer yet, add one with an empty swims set
            if(swimmers[event.ussNum] === undefined)
                swimmers[event.ussNum] = {swims:[]};
            
            swimmers[event.ussNum].swims.push(event);
            events.add(event.eventNum);

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
        case 'E0': {// relay team 
          const relayTeam = U.parseE0(line); 
          let teams = this.state.teams;
          let relays = teams[teams.length -1].relays;
          
          relays.push(relayTeam);
          events.add(relayTeam.eventNum);
          
          teams[teams.length -1].relays = relays;
          this.setState({teams: teams});

          break;
        }
        case 'F0': {// relay swimmer
          const relaySwimmer = U.parseF0(line);
          let teams = this.state.teams;
          let relays = teams[teams.length -1].relays;

          // Get swimmers for last-entered relay (can assume this)
          relays[relays.length-1].swimmers.push(relaySwimmer);
          teams[teams.length -1].relays = relays;
          this.setState({teams: teams});
    
          break;
        }
        case 'G0': {
            const splitRec = U.parseG0(line); 
            let teams = this.state.teams;
            let swimmer = teams[teams.length -1].swimmers[splitRec.ussNum];

            // Swimmer was never entered in, just skip it for now
            // TODO - need to handle this
            if(swimmer === undefined) 
                break;
            
            // Because all a swimmer's G0 records directly follows their D3, we
            // can properly assume that the last entered swimmer is the correct one
            swimmer.swims[ swimmer.swims.length -1 ].splits.push(splitRec);

            // Update team with newly built swimmer
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

    const eventlist = this.getEvents(Array.from(events));
    this.setState({events: eventlist});
  }

  // Puts swimmers in every event they swam
  getEvents(eventNums) {
        const teams = this.state.teams;
        let events = [[]];

        // for each event, go through teams -> swimmers and pull out who swam what.
        // A number of ways to make this faster:
        // -- Check event age and compare to swimmer age

        for(let eventNum of eventNums) {
            events[eventNum] = [];
            let bContinue = false;
            for(let team of teams) {

                // Try relays first since it's short and we can skip the rest if not needed
                for( let r of team.relays ) {
                  if(r.eventNum === eventNum) {
                    events[eventNum].push(r);
                    bContinue = true;
                    break;
                  }
                }

                if(bContinue) continue;

                for(let s in team.swimmers) {
                    if( team.swimmers.hasOwnProperty(s)){
                        let swimmer = team.swimmers[s];

                        for(let swim of swimmer.swims) {
                            if(swim.eventNum === eventNum) 
                                events[eventNum].push(swim);
                        }
                    }
                }
            }

            if(teams.length === 0 )
                return [];
        }

        return events;
  }

  render() {

      const childrenWithProps = React.Children.map(this.props.children,
        (child) => React.cloneElement(child, {
          teams: this.state.teams,
          events: this.state.events
        })
      );

    if(this.state.lines.length === 0) {
        return (
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col">
                <form onSubmit={this.onFormSubmit}>
                    <input type="file" ref="file" name="file" id="file"/>
                    <button type="submit">Submit</button>
                </form>
                <hr/>
                <h5>Import any .sd3 or .cl2 meet file to see a list of swimmers and their times, splits, improvements, and points scored.</h5>
                <h6>None of this information is saved.</h6>
            </div>
          </div>
        );
    }
    
    return (
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col">
              <form onSubmit={this.onFormSubmit}>
                <input type="file" ref="file" name="file" id="file"/>
                <button type="submit">Submit</button>
              </form>
              <hr/>
          </div>
          <div className="mdl-cell mdl-cell--1-col">
            <div className="sidenav">
              <h6>TEAMS</h6>
              <TeamList teams={this.state.teams} />
              <hr />
              <Link to="/meetreader">Event List</Link> 
              <hr />
              <Link to="/meetreader/events">All Events</Link>                       
            </div>
          </div>
          <div className="mdl-cell mdl-cell--11-col">
              { childrenWithProps || <MRDashboard events={this.state.events} /> }
          </div>
        </div>
    );
  }
}

export default MeetReader;
