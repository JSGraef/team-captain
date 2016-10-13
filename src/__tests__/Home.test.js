import React from 'react';
import { shallow } from 'enzyme';
import Home from '../Home';
import {Link} from 'react-router'

describe('<ToDoItem />', () => {
  
  it('renders without crashing', () => {
    shallow(<Home />);
  });

  it('renders see workouts button', () => {
    const homepage = shallow(<Home />);
    const workoutsbutton = <Link className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" to="workouts">SEE WORKOUTS</Link>;
    expect(homepage.contains(workoutsbutton)).toEqual(true);
  });
});