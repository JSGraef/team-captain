import React, { Component } from 'react';
import { Link } from 'react-router';
import logo from './images/TeamCaptainLogo_30h.png';
  
class Navigation extends Component {
  
    render() {
      return (
        <div>
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
        </div>
      );
    };

}

export default Navigation;
