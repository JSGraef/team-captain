import React, { Component } from 'react';
import { Link } from 'react-router';
import logo from './images/TeamCaptainLogo_30h.png';

import firebase from 'firebase';
import firebaseui from 'firebaseui';

import {config} from './config/config';
import Rebase  from 're-base';
var base = Rebase.createClass(config);

//let fbapp = firebase.initializeApp(config);
let authUi = new firebaseui.auth.AuthUI(firebase.auth());
  
class App extends Component {

  constructor() {
    super();
    this.state = {
      workouts: {},
      authed: false
    }
  }

  //------------------------------------------------------------------------------------------
    componentDidMount() {
      this.bindref = base.bindToState('workouts', {
          context : this,
          state: 'workouts'
      });

      var uiConfig = {
        'callbacks': {
          'signInSuccess': (user) => {
            console.log('user: ');
            this.setState({authed: true});
          }
        },
        signInFlow: 'popup',
        'signInOptions': [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
      };
      authUi.start('#firebaseui-auth', uiConfig);
    }

    componentWillUnmount() {
      base.removeBinding(this.bindref);
      authUi.reset();
    }

    render() {
      const childrenWithProps = React.Children.map(this.props.children,
        (child) => React.cloneElement(child, {
          workouts: this.state.workouts,
          authed: this.state.authed
        })
      );
      
      console.log('authed: ', this.state.authed);
      return this.state.authed ? 
        this.renderSignedIn(childrenWithProps) :
        this.renderNotSignedIn(childrenWithProps);
  }

  renderSignedIn(childrenWithProps) {
      return (
        <div className="mdl-layout mdl-js-layout">
          <header className="mdl-layout__header mdl-layout__header--seamed blackheader">
          
            <div className="mdl-layout__header-row">
              <span className="mdl-layout-title">
                <Link className="mdl-navigation__link" to="/dashboard"><img src={logo}  alt="Team Captain"/> TEAM CAPTAIN</Link>
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
              <Link className="mdl-navigation__link" to="/dashboard">Dashboard</Link>
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

    renderNotSignedIn(childrenWithProps) {
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
              </nav>     
              
            </div>

          </header>

          <div className="mdl-layout__drawer">
            <span className="mdl-layout-title">Team Captain</span>
            <nav className="mdl-navigation">
              <Link className="mdl-navigation__link" to="/pacecalculator">Pace Calculator</Link>
              <Link className="mdl-navigation__link" to="/workouts">Workouts</Link>
            </nav>
          </div>

          <main className="mdl-layout__content app mdl-color--grey-100 ">
                  { childrenWithProps }
          </main>
        </div>
      );
    };

}

export default App;
