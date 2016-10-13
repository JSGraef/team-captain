import React from 'react';
import { shallow } from 'enzyme';

import CreateWorkoutSet from '../CreateWorkoutSet';
import CreateWorkoutSwim from '../CreateWorkoutSwim';

const workout = require('../sample-workout');
const set = workout.sets['set-mainset'];

describe('<CreateWorkoutSet />', () => {

  it('renders without crashing', () => {
    shallow(<CreateWorkoutSet currentState={set} />);
  });

  it('renders proper amount of swims', () => {
    const wrapper = shallow(<CreateWorkoutSet currentState={set} />);
    const length = Object.keys(set.swims).length;
    expect(wrapper.find(CreateWorkoutSwim).length).toBe(length);
  });

  it('renders proper set title', () => {
    const wrapper = shallow(<CreateWorkoutSet currentState={set} />);
    expect(wrapper.contains(set.title)).toEqual(true);
  });

});

