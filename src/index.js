import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import { Router, Route, browserHistory } from 'react-router';

import App from './App';
import ListWorkouts from './ListWorkouts';
import Workout from './Workout';
import Create from './Create';
import Edit from './Edit';
import Print from './Print';
import PageNotFound from './PageNotFound';

ReactDOM.render((
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)} >
    
    <Route path="print/:workoutid" component={Print}/>
    <Route path="/" component={App} >
      <Route path="workouts" component={ListWorkouts}/>
      <Route path="create" component={Create}/>
      <Route path="edit/:workoutId" component={Edit}/>
      <Route path="workouts/:workoutid" component={Workout}/>
      <Route path="*" component={PageNotFound}/>      
    </Route>
  
  </Router>
  ),
  document.getElementById('root')
);
