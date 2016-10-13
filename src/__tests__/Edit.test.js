import React from 'react';
import { shallow } from 'enzyme';

import Edit from '../Edit';
import CreateWorkout from '../CreateWorkout';
import CreateWorkoutSwim from '../CreateWorkoutSwim';

const workout = require('../sample-workout');

describe('<Edit />', () => {
  it('renders without crashing', () => {
    shallow(<Edit />);
  });

  it('renders progress bar with no data inputed', () => {
    const wrapper = shallow(<Edit />);
    expect(wrapper.find('.mdl-progress').length).toBe(1);
  });

  it('renders the CreateWorkout component', () => {
    const wrapper = shallow(<Edit workout={workout}/>);
    expect(wrapper.find(CreateWorkout).length).toBe(1);
  });

});