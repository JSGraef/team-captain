import React, { Component } from 'react';

import { Link } from 'react-router';
import c from './config/config';

import logo from './images/TeamCaptainLogo_30h.png';

var config = c;

import Rebase  from 're-base';
var base = Rebase.createClass(config);
  
class App extends Component {

  constructor() {
    super();
    this.state = {
      workouts: {}
    }
  }

  //------------------------------------------------------------------------------------------
    componentDidMount() {
      this.bindref = base.bindToState('workouts', {
          context : this,
          state: 'workouts'
      });
    }

    componentWillUnmount() {
      base.removeBinding(this.bindref);
    }

  render() {
    var workouts = Object.keys(this.state.workouts);
    if(workouts === null)
      workouts = [];

    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       workouts: this.state.workouts
     })
    );

    return (       

        <div className="mdl-layout mdl-js-layout">
          <header className="mdl-layout__header mdl-layout__header--seamed blackheader">
          
            <div className="mdl-layout__header-row">
              <span className="mdl-layout-title">
                <Link className="mdl-navigation__link" to="/"><img src={logo}  alt="Team Captain"/> TEAM CAPTAIN</Link>
              </span>

              <div className="mdl-layout-spacer"></div>

              <nav className="mdl-navigation">
                <Link className="mdl-navigation__link" to="/pacecalculator">Pace Calculator</Link>
                <Link className="mdl-navigation__link" to="/workouts">Workouts</Link>
                <Link className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" to="/create">
                  Create a Workout
                </Link>
              </nav>     
              
            </div>

          </header>

          <div className="mdl-layout__drawer">
            <span className="mdl-layout-title">Team Captain</span>
            <nav className="mdl-navigation">
              <Link className="mdl-navigation__link" to="/pacecalculator">Pace Calculator</Link>
              <Link className="mdl-navigation__link" to="/workouts">Workouts</Link>
              <Link className="mdl-navigation__link" to="/create">
                Create a Workout
              </Link>
            </nav>
          </div>

          <main className="mdl-layout__content app mdl-color--grey-100 ">
                  { childrenWithProps }
          </main>
        </div>
      
    );
  }
}

export default App;
